"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="border border-gold/50 bg-white px-7 py-9 text-center">
        <p className="font-serif text-lg text-black">Thank you, {form.name.split(" ")[0] || "there"}.</p>
        <p className="mt-2 text-[14px] text-grey">
          Your message has been received. Our team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block font-body text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full border border-line bg-white px-4.5 py-3.5 font-body text-[14px] text-black outline-none focus:border-gold"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block font-body text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
          Email
        </label>
        <input
          id="email"
          type="email"
          suppressHydrationWarning
          required
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full border border-line bg-white px-4.5 py-3.5 font-body text-[14px] text-black outline-none focus:border-gold"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block font-body text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className="w-full border border-line bg-white px-4.5 py-3.5 font-body text-[14px] text-black outline-none focus:border-gold"
        />
      </div>
      {error ? <p className="text-[13px] text-red-600">{error}</p> : null}
      <button
        type="submit"
        suppressHydrationWarning
        disabled={loading}
        className="w-full bg-gold px-8 py-4 font-body text-[11.5px] font-medium uppercase tracking-[0.3em] text-black transition-colors duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
