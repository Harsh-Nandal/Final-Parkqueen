"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/profile")
      .then((res) => res.json())
      .then((data) => {
        setForm({ name: data.name, email: data.email, password: "" });
        setLoading(false);
      });
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSaved(false);

    const res = await fetch("/api/admin/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Could not save.");
      return;
    }
    setForm((f) => ({ ...f, password: "" }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  if (loading) return <p className="text-sm text-slate-500">Loading…</p>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-xl text-black">Admin Profile</h1>
        {saved ? <span className="text-xs uppercase tracking-wide text-green-600">Saved</span> : null}
      </div>

      <form onSubmit={handleSubmit} className="max-w-md space-y-5 border border-slate-200 bg-white p-6">
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-navy"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Email</label>
          <input
            type="email"
            suppressHydrationWarning
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-navy"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
            New Password (leave blank to keep current)
          </label>
          <input
            type="password"
            suppressHydrationWarning
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            className="w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-navy"
          />
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button type="submit" suppressHydrationWarning className="bg-navy px-6 py-2.5 text-xs font-medium uppercase tracking-wide text-white">
          Save Changes
        </button>
      </form>
    </div>
  );
}
