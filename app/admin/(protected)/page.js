import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/lib/models/Booking";
import Message from "@/lib/models/Message";
import Room from "@/lib/models/Room";

export default async function AdminDashboardPage() {
  let counts = { bookings: 0, messages: 0, rooms: 0 };

  try {
    await connectDB();
    const [bookings, messages, rooms] = await Promise.all([
      Booking.countDocuments(),
      Message.countDocuments(),
      Room.countDocuments(),
    ]);
    counts = { bookings, messages, rooms };
  } catch {
    // DB not reachable — dashboard still renders with zeroed counts.
  }

  const cards = [
    { label: "Booking Enquiries", value: counts.bookings, href: "/admin/bookings" },
    { label: "Contact Messages", value: counts.messages, href: "/admin/messages" },
    { label: "Rooms Configured", value: counts.rooms, href: "/admin/rooms" },
  ];

  return (
    <div>
      <h1 className="mb-2 font-display text-2xl text-black">Welcome back</h1>
      <p className="mb-8 text-sm text-slate-500">
        Manage every page's content, images and settings from the sidebar. Any collection left empty falls
        back to the site's built-in defaults, so the public site never breaks.
      </p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="block border border-slate-200 bg-white p-6 hover:border-navy">
            <b className="block font-display text-3xl text-black">{card.value}</b>
            <span className="mt-1 block text-xs uppercase tracking-wide text-slate-500">{card.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
