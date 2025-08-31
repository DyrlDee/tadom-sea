"use client";

import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Default icon fix for Leaflet in React
import "leaflet/dist/leaflet.css";
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Import the Leaflet rotated marker plugin
// This import adds the rotationAngle property to L.Marker
import "leaflet-rotatedmarker";

type VesselRecord = {
  sourcemmsi: string;
  navigationalstatus: number;
  rateofturn: number;
  speedoverground: number;
  courseoverground: number;
  trueheading: number;
  lon: number;
  lat: number;
  t: number;
};

// Define the custom vessel icon using a div and an SVG
const vesselIcon = L.divIcon({
  className: "vessel-icon",
  html: `
     <div style="transform-origin: center;">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -12 24 36">
        <path d="M12 -12L22 24H2L12 -12Z" fill="#fa4f4fff" />
    </svg>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12], // Anchor at the center of the icon
});

const collisionLocation = { lat: 28.31075871832035, lon: -96.67701448190826 };

const API_DOMAIN = "http://localhost:8000";

export default function VesselMap() {
  const [previousDataVessels, setPreviousDataVessels] = useState<
    Record<string, VesselRecord>
  >({});
  const [vessels, setVessels] = useState<Record<string, VesselRecord>>({});
  const [selectedVessel, setSelectedVessel] = useState<VesselRecord | null>(
    null
  );

  const previousVesselsRef = useRef<Record<string, VesselRecord>>({});
  const [showCollisionMarker, setShowCollisionMarker] = useState(false);

  useEffect(() => {
    const eventSource = new EventSource(`${API_DOMAIN}/start-simulation`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const records = data.records as Record<
          string,
          Omit<VesselRecord, "sourcemmsi">
        >;

        // Use a functional update to get the previous 'vessels' state
        setVessels((prevVessels) => {
          // Now, create the new 'vessels' state
          previousVesselsRef.current = { ...prevVessels };
          const updated = { ...prevVessels };
          for (const [mmsi, vesselData] of Object.entries(records)) {
            updated[mmsi] = { sourcemmsi: mmsi, ...vesselData };
          }
          return updated;
        });
      } catch (err) {
        console.error("Error parsing SSE:", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE connection error:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const circleIcon = L.divIcon({
    className: "red-circle-marker",
    html: `<div style="
    background-color: red;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    opacity: 0.5;
    border: 1px solid darkred;
  "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  const requestPrediction = async (v: VesselRecord) => {
    // if (selectedVessel == null) {
    //   return;
    // }
    try {
      const response = await fetch(`${API_DOMAIN}/collision-risk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          previous: previousVesselsRef.current ?? {},
          current: vessels,
          selected: v.sourcemmsi ?? 0,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();

        if (responseData.status) {
        }
      } else {
        // Handle non-OK responses
        const errorData = await response.json();
        console.error("API error:", errorData);
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <>
      <div>
        <div className="flex flex-row gap-2 items-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold m-4 py-2 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out"
            onClick={() => {
              setShowCollisionMarker(true);
            }}
          >
            Predict oil spill
          </button>
          <div>Selected Vessel: {selectedVessel?.sourcemmsi}</div>
        </div>

        <MapContainer
          center={[35, -97]}
          zoom={6}
          style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {Object.values(vessels).map((v) => (
            <Marker
              key={v.sourcemmsi}
              position={[v.lat, v.lon]}
              icon={vesselIcon}
              // Use the rotationAngle property from the plugin
              rotationAngle={v.trueheading || 0}
              rotationOrigin="center"
            >
              <Popup>
                <div>
                  <strong>MMSI:</strong> {v.sourcemmsi} <br />
                  <strong>SOG:</strong> {v.speedoverground} kn <br />
                  <strong>COG:</strong> {v.courseoverground}° <br />
                  <button
                    onClick={() => {
                      setSelectedVessel(v);
                      //   requestPrediction(v);

                      console.log("DONE");
                    }}
                    style={{
                      backgroundColor: "#007bff" /* A pleasant blue color */,
                      color: "white",
                      border: "none",
                      padding: "10px 15px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginTop: "10px" /* Add some space above the button */,
                    }}
                  >
                    Select vessel
                  </button>
                  {/* <strong>Status:</strong> {v.navigationalstatus} */}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
}

// "use client";

// import React from "react";
// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";

// // Default icon fix (Leaflet 1.x issue in React apps)
// import "leaflet/dist/leaflet.css";
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });

// type VesselRecord = {
//   sourcemmsi: string;
//   navigationalstatus: number;
//   rateofturn: number;
//   speedoverground: number;
//   courseoverground: number;
//   trueheading: number;
//   lon: number;
//   lat: number;
// };

// {
//   showCollisionMarker && (
//     <Marker
//       position={[28.31075871832035, -96.67701448190826]}
//       icon={circleIcon}
//     >
//       <Popup>
//         <div>
//           <strong>Potential Collision & Oil Spill</strong>
//           <br />A risk has been identified in this area.
//         </div>
//       </Popup>
//     </Marker>
//   );
// }

// export default function VesselMap() {
//   const [vessels, setVessels] = useState<Record<string, VesselRecord>>({});

//   useEffect(() => {
//     const eventSource = new EventSource(
//       "http://localhost:8000/start-simulation"
//     );

//     eventSource.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         const records = data.records as Record<
//           string,
//           Omit<VesselRecord, "sourcemmsi">
//         >;

//         setVessels((prev) => {
//           const updated = { ...prev };
//           for (const [mssi, vesselData] of Object.entries(records)) {
//             updated[mssi] = { sourcemmsi: mssi, ...vesselData };
//           }
//           return updated;
//         });
//       } catch (err) {
//         console.error("Error parsing SSE:", err);
//       }
//     };

//     eventSource.onerror = (err) => {
//       console.error("SSE connection error:", err);
//       eventSource.close();
//     };

//     return () => {
//       eventSource.close();
//     };
//   }, []);

//   return (
//     <MapContainer
//       center={[35, -97]} // Malaysia waters as example
//       zoom={6}
//       style={{ height: "100vh", width: "100%" }}
//     >
//       <TileLayer
//         attribution="&copy; OpenStreetMap contributors"
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />

//       {Object.values(vessels).map((v) => (
//         <Marker key={v.sourcemmsi} position={[v.lat, v.lon]}>
//           <Popup>
//             <div>
//               <strong>MMSI:</strong> {v.sourcemmsi} <br />
//               <strong>SOG:</strong> {v.speedoverground} kn <br />
//               <strong>COG:</strong> {v.courseoverground}° <br />
//               <strong>Status:</strong> {v.navigationalstatus}
//             </div>
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// }
