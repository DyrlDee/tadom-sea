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
  const [status, setStatus] = useState<string>("Loading reports...");
  const [mapKey, setMapKey] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        const res = await fetch(`${apiBase}/api/reports?limit=1000`);
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setReports(data);
        setStatus(data.length > 0 ? `Showing ${data.length} pollution reports` : "No reports found");
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
        setStatus(`Failed to load reports: ${errorMessage}`);
      } finally {
        setIsLoading(false);
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
    setStatus("Map refreshed");
  };

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col">
      {/* Header Controls */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Pollution Heatmap
              </h1>
              <div className="flex items-center gap-2 mt-1">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-sm text-gray-600">Loading reports...</span>
                  </div>
                ) : (
                  <span className={`text-sm ${
                    status.includes("Failed") 
                      ? "text-red-600" 
                      : "text-gray-600"
                  }`}>
                    {status}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-200">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Pollution Reports</span>
            </div>
            <button 
              onClick={refreshMap}
              className="btn-secondary inline-flex items-center gap-2 text-sm"
              title="Refresh the map display"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh Map
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
            <div className="text-center space-y-4">
              <svg className="animate-spin w-8 h-8 text-blue-600 mx-auto" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <div>
                <p className="text-lg font-medium text-gray-900">Loading Map</p>
                <p className="text-sm text-gray-600">Preparing pollution data visualization...</p>
              </div>
            </div>
          </div>
        )}
        
        <MapComponent 
          key={mapKey}
          center={center as [number, number]} 
          zoom={10} 
          reports={reports}
        />
        
        {/* Map Stats Overlay */}
        {!isLoading && reports.length > 0 && (
          <div className="absolute bottom-4 left-4 bg-white rounded-xl p-4 shadow-lg border border-gray-200 max-w-sm">
            <h3 className="font-semibold text-gray-900 mb-2">Report Statistics</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Reports:</span>
                <span className="font-medium text-blue-600">{reports.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Latest Report:</span>
                <span className="text-sm font-medium text-gray-900">
                  {reports.length > 0 
                    ? new Date(reports[0].created_at).toLocaleDateString()
                    : 'N/A'
                  }
                </span>
              </div>
            </div>
          </div>
        )}

        {/* No Data State */}
        {!isLoading && reports.length === 0 && !status.includes("Failed") && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4 p-8">
              <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">No Reports Yet</h3>
                <p className="text-gray-600 mt-2 max-w-md">
                  No pollution reports have been submitted yet. Be the first to report an environmental issue!
                </p>
                <a
                  href="/report"
                  className="btn-primary inline-flex items-center gap-2 mt-4"
                >
                  Submit First Report
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


