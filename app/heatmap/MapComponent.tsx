"use client";

import { useEffect, useRef, useState } from "react";

type Report = {
  _id: string;
  latitude: number;
  longitude: number;
  created_at: string;
  description?: string | null;
  image_url?: string | null;
};

interface MapComponentProps {
  center: [number, number];
  zoom: number;
  reports: Report[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LeafletMap = any;

export default function MapComponent({ center, zoom, reports }: MapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap>(null);
  const isInitializingRef = useRef<boolean>(false);
  const [isMapReady, setIsMapReady] = useState(false);

  // Initialize map only once when component mounts
  useEffect(() => {
    if (!mapContainerRef.current) return;
    // Prevent double init in StrictMode or quick navigations
    if (isInitializingRef.current) return;
    if (mapInstanceRef.current) return;
    isInitializingRef.current = true;
    // If Leaflet already attached to this container, reset it
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((mapContainerRef.current as any)._leaflet_id) {
      try {
        mapContainerRef.current.innerHTML = "";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (mapContainerRef.current as any)._leaflet_id;
      } catch {
        // Ignore errors
      }
    }

    const initMap = async () => {
      try {
        // Dynamically import Leaflet only on client side
        const L = await import('leaflet');
        
        // Create map instance only once
        const map = L.map(mapContainerRef.current!, {
          center: center,
          zoom: zoom,
          zoomControl: true,
          attributionControl: true
        });

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        mapInstanceRef.current = map;
        setIsMapReady(true);
      } catch (error) {
        console.error('Failed to initialize map:', error);
      }
      finally {
        isInitializingRef.current = false;
      }
    };

    initMap();

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch {
          // Ignore cleanup errors
        }
        mapInstanceRef.current = null;
        isInitializingRef.current = false;
        // Ensure container is clean for future inits
        if (mapContainerRef.current) {
          try {
            mapContainerRef.current.innerHTML = "";
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete (mapContainerRef.current as any)._leaflet_id;
          } catch {}
        }
      }
    };
  }, []); // Empty dependency array - only run once

  // Update map center and zoom when props change
  useEffect(() => {
    if (mapInstanceRef.current && isMapReady) {
      mapInstanceRef.current.setView(center, zoom);
    }
  }, [center, zoom, isMapReady]);

  // Add markers when reports change
  useEffect(() => {
    if (!mapInstanceRef.current || !isMapReady) return;

    // Clear existing markers
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapInstanceRef.current.eachLayer((layer: any) => {
      if (layer._url && layer._url.includes('tile.openstreetmap.org')) {
        // Keep tile layers
        return;
      }
      mapInstanceRef.current.removeLayer(layer);
    });

    // Add new markers
    reports.forEach(async (report) => {
      const L = await import('leaflet');
      L.circleMarker([report.latitude, report.longitude], {
        radius: 6,
        color: 'red',
        fillColor: 'red',
        fillOpacity: 0.5
      }).addTo(mapInstanceRef.current);
    });
  }, [reports, isMapReady]);

  return (
    <div 
      ref={mapContainerRef} 
      className="h-[85vh] w-full"
      style={{ minHeight: '400px' }}
    />
  );
}
