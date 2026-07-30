"use client";

import { useState } from "react";

export default function ImageUploader({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed.");
      onChange(data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex items-center gap-4">
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="h-16 w-16 flex-none rounded object-cover" />
      ) : (
        <div className="h-16 w-16 flex-none rounded border border-dashed border-slate-300" />
      )}
      <div>
        <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={handleFile} className="text-xs" />
        {uploading ? <p className="mt-1 text-xs text-slate-500">Uploading…</p> : null}
        {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
        {value ? <p className="mt-1 max-w-xs truncate text-xs text-slate-400">{value}</p> : null}
      </div>
    </div>
  );
}
