"use client";

import { useState } from "react";

export default function ReportPage() {
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Submitting...");
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);
      if (description) formData.append('description', description);
      if (imageFile) formData.append('image', imageFile);

      const res = await fetch(`${apiBase}/api/reports`, {
        method: "POST",
        body: formData, // Send FormData instead of JSON
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }
      const successMessage = `Report submitted successfully! 📍 Location: ${latitude}, ${longitude}${description ? ` | Description: "${description}"` : ""}${imageFile ? " | Image uploaded" : ""}`;
      setStatus(successMessage);
      setLatitude("");
      setLongitude("");
      setDescription("");
      setImageFile(null);
      setImagePreview("");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit';
      setStatus(`Error: ${errorMessage}`);
    }
  }

  function useMyLocation() {
    if (!navigator.geolocation) {
      setStatus("Geolocation not supported.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(String(pos.coords.latitude));
        setLongitude(String(pos.coords.longitude));
      },
      (err) => setStatus(`Geolocation error: ${err.message}`)
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-semibold">Report Plastic Pollution</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium">Latitude</label>
          <input
            type="number"
            step="any"
            required
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium">Longitude</label>
          <input
            type="number"
            step="any"
            required
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium">Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={3}
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium">Upload Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImageFile(file);
                // Create preview URL
                const reader = new FileReader();
                reader.onload = () => {
                  setImagePreview(reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
            className="w-full border rounded px-3 py-2"
          />
          {imagePreview && (
            <div className="mt-2">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-32 h-32 object-cover rounded border"
              />
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={useMyLocation} className="border rounded px-3 py-2">
            Use my location
          </button>
          <button type="submit" className="border rounded px-3 py-2 bg-black text-white">
            Submit Report
          </button>
        </div>
      </form>
      {status && (
        <div className={`p-4 rounded-lg text-sm ${
          status.includes("successfully") 
            ? "bg-green-100 text-green-800 border border-green-200" 
            : status.includes("Error") 
            ? "bg-red-100 text-red-800 border border-red-200"
            : "bg-blue-100 text-blue-800 border border-blue-200"
        }`}>
          {status.includes("successfully") && (
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span className="font-medium">{status}</span>
            </div>
          )}
          {status.includes("Error") && (
            <div className="flex items-center gap-2">
              <span className="text-red-600">✗</span>
              <span className="font-medium">{status}</span>
            </div>
          )}
          {!status.includes("successfully") && !status.includes("Error") && (
            <div className="flex items-center gap-2">
              <span className="text-blue-600">ℹ</span>
              <span className="font-medium">{status}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


