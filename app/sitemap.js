import { getSettings } from "@/lib/content/getSettings";
import { getRooms } from "@/lib/content/getRooms";

const STATIC_ROUTES = [
  { path: "", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/rooms", priority: 0.9 },
  { path: "/dining", priority: 0.7 },
  { path: "/banquets", priority: 0.7 },
  { path: "/facilities", priority: 0.6 },
  { path: "/service", priority: 0.5 },
  { path: "/gallery", priority: 0.6 },
  { path: "/contact", priority: 0.6 },
  { path: "/booking", priority: 0.8 },
  { path: "/privacy-policy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
  { path: "/cancellation-policy", priority: 0.2 },
];

export default async function sitemap() {
  const [settings, rooms] = await Promise.all([getSettings(), getRooms()]);
  const now = new Date();

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${settings.url}${route.path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route.priority,
  }));

  const roomEntries = rooms.map((room) => ({
    url: `${settings.url}/rooms/${room.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...roomEntries];
}
