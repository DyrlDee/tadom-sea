"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

// Import Leaflet CSS only on client side
import "leaflet/dist/leaflet.css";

// Create a completely isolated map component
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => <div className="h-[85vh] w-full bg-gray-100 flex items-center justify-center">Loading map...</div>
});

type Report = {
  _id: string;
  latitude: number;
  longitude: number;
  created_at: string;
  description?: string | null;
  image_url?: string | null;
};

export default function HeatmapPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [status, setStatus] = useState<string>("Loading...");
  const [mapKey, setMapKey] = useState<number>(0);
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${apiBase}/api/reports?limit=1000`);
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setReports(data);
        setStatus("");
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
        setStatus(`Failed to load: ${errorMessage}`);
      }
    }
    load();
  }, [apiBase]);

  // Handle map errors
  useEffect(() => {
    const handleMapError = () => {
      setStatus("Map error detected. Click 'Refresh Map' to fix.");
    };

    window.addEventListener('error', handleMapError);
    return () => window.removeEventListener('error', handleMapError);
  }, []);

  const center = useMemo<[number, number]>(() => {
    if (reports.length > 0) return [reports[0].latitude, reports[0].longitude];
    return [3.139, 101.6869]; // Kuala Lumpur as default
  }, [reports]);

  // Function to refresh map if needed
  const refreshMap = () => {
    setMapKey(prev => prev + 1);
  };

  return (
    <div className="h-screen w-screen">
      <div className="p-3 flex justify-between items-center">
        <h1 className="text-lg font-semibold">Plastic Reports Heatmap</h1>
        <button 
          onClick={refreshMap}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          Refresh Map
        </button>
      </div>
      {status && <p className="text-sm">{status}</p>}
      <MapComponent 
        key={mapKey}
        center={center as [number, number]} 
        zoom={10} 
        reports={reports}
      />
    </div>
  );
}


