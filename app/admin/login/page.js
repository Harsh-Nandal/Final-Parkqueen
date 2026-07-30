"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed.");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm border border-slate-200 bg-white p-8">
        <h1 className="mb-1 font-display text-xl text-black">ParkQueen Admin</h1>
        <p className="mb-6 text-sm text-slate-500">Sign in to manage the website.</p>

        <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Email</label>
        <input
          type="email"
          suppressHydrationWarning
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="mb-4 w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-navy"
        />

        <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Password</label>
        <input
          type="password"
          suppressHydrationWarning
          required
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          className="mb-5 w-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-navy"
        />

        {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          suppressHydrationWarning
          disabled={loading}
          className="w-full bg-navy px-6 py-3 text-xs font-medium uppercase tracking-wide text-white disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
