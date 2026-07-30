"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_GROUPS = [
  {
    label: "Overview",
    links: [{ href: "/admin", label: "Dashboard" }],
  },
  {
    label: "Content",
    links: [
      { href: "/admin/rooms", label: "Rooms" },
      { href: "/admin/dining", label: "Dining Venues" },
      { href: "/admin/event-spaces", label: "Event Spaces" },
      { href: "/admin/banquet-teasers", label: "Banquet Teasers" },
      { href: "/admin/facilities", label: "Facilities" },
      { href: "/admin/amenities", label: "Amenities" },
      { href: "/admin/gallery", label: "Gallery" },
      { href: "/admin/offers", label: "Offers" },
      { href: "/admin/testimonials", label: "Testimonials" },
      { href: "/admin/faqs", label: "FAQs" },
      { href: "/admin/hero-slides", label: "Hero Slider" },
    ],
  },
  {
    label: "Pages",
    links: [
      { href: "/admin/homepage", label: "Homepage Sections" },
      { href: "/admin/about-content", label: "About Page" },
      { href: "/admin/settings", label: "Site Settings" },
    ],
  },
  {
    label: "Enquiries",
    links: [
      { href: "/admin/bookings", label: "Booking Enquiries" },
      { href: "/admin/messages", label: "Contact Messages" },
    ],
  },
  {
    label: "Account",
    links: [{ href: "/admin/profile", label: "Admin Profile" }],
  },
];

export default function AdminShell({ admin, children }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <aside className="w-64 flex-none border-r border-slate-200 bg-white px-5 py-6">
        <Link href="/admin" className="mb-8 block font-display text-lg text-black">
          ParkQueen Admin
        </Link>
        <nav className="space-y-6">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-slate-400">{group.label}</p>
              <ul className="space-y-1">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block px-3 py-2 text-sm ${
                        pathname === link.href ? "bg-navy text-white" : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
          <Link href="/" className="text-xs uppercase tracking-wide text-slate-500 hover:text-black">
            ← View Site
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">{admin.name}</span>
            <button onClick={handleLogout} className="text-xs font-medium uppercase tracking-wide text-red-600">
              Log Out
            </button>
          </div>
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
