"use client";

import { useState } from "react";
import { ROOMS } from "@/lib/data/rooms";

function todayPlus(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export default function BookingForm({ rooms = ROOMS }) {
  const [form, setForm] = useState({
    checkIn: todayPlus(0),
    checkOut: todayPlus(1),
    adults: 2,
    children: 0,
    roomType: rooms[0].name,
    name: "",
    phone: "",
    email: "",
  });
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
      const res = await fetch("/api/bookings", {
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
      <div className="border border-gold/50 bg-white px-8 py-10 text-center">
        <p className="font-serif text-xl text-black">Thank you, {form.name.split(" ")[0] || "there"}.</p>
        <p className="mt-3 text-[14px] text-grey">
          Your enquiry for {form.roomType} from {form.checkIn} to {form.checkOut} has been received.
          Our reservations team will confirm availability shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-line bg-white p-7 sm:p-9">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="checkIn" className="mb-1.5 block font-body text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
            Check In
          </label>
          <input
            id="checkIn"
            type="date"
            required
            value={form.checkIn}
            onChange={(e) => handleChange("checkIn", e.target.value)}
            className="w-full border border-line bg-white px-4 py-3.5 font-body text-[14px] text-black outline-none focus:border-gold"
          />
        </div>
        <div>
          <label htmlFor="checkOut" className="mb-1.5 block font-body text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
            Check Out
          </label>
          <input
            id="checkOut"
            type="date"
            required
            value={form.checkOut}
            onChange={(e) => handleChange("checkOut", e.target.value)}
            className="w-full border border-line bg-white px-4 py-3.5 font-body text-[14px] text-black outline-none focus:border-gold"
          />
        </div>
        <div>
          <label htmlFor="adults" className="mb-1.5 block font-body text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
            Adults
          </label>
          <input
            id="adults"
            type="number"
            min={1}
            required
            value={form.adults}
            onChange={(e) => handleChange("adults", e.target.value)}
            className="w-full border border-line bg-white px-4 py-3.5 font-body text-[14px] text-black outline-none focus:border-gold"
          />
        </div>
        <div>
          <label htmlFor="children" className="mb-1.5 block font-body text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
            Children
          </label>
          <input
            id="children"
            type="number"
            min={0}
            value={form.children}
            onChange={(e) => handleChange("children", e.target.value)}
            className="w-full border border-line bg-white px-4 py-3.5 font-body text-[14px] text-black outline-none focus:border-gold"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="roomType" className="mb-1.5 block font-body text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
            Room Type
          </label>
          <select
            id="roomType"
            value={form.roomType}
            onChange={(e) => handleChange("roomType", e.target.value)}
            className="w-full border border-line bg-white px-4 py-3.5 font-body text-[14px] text-black outline-none focus:border-gold"
          >
            {rooms.map((room) => (
              <option key={room.slug} value={room.name}>
                {room.name}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="name" className="mb-1.5 block font-body text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full border border-line bg-white px-4 py-3.5 font-body text-[14px] text-black outline-none focus:border-gold"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block font-body text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full border border-line bg-white px-4 py-3.5 font-body text-[14px] text-black outline-none focus:border-gold"
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
            className="w-full border border-line bg-white px-4 py-3.5 font-body text-[14px] text-black outline-none focus:border-gold"
          />
        </div>
      </div>
      {error ? <p className="mt-4 text-[13px] text-red-600">{error}</p> : null}
      <button
        type="submit"
        suppressHydrationWarning
        disabled={loading}
        className="mt-7 w-full bg-gold px-8 py-4 font-body text-[11.5px] font-medium uppercase tracking-[0.3em] text-black transition-colors duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Submitting…" : "Submit Enquiry"}
      </button>
    </form>
  );
}
