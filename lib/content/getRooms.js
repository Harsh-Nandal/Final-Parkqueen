import { connectDB } from "@/lib/mongodb";
import Room from "@/lib/models/Room";
import { ROOMS, ROOM_POLICY } from "@/lib/data/rooms";

export async function getRooms() {
  try {
    await connectDB();
    const docs = await Room.find().sort({ order: 1, createdAt: 1 }).lean();
    if (docs.length === 0) return ROOMS;

    return docs.map((r) => ({
      slug: r.slug,
      name: r.name,
      count: r.count,
      priceSingle: r.priceSingle,
      priceDouble: r.priceDouble,
      shortDescription: r.shortDescription,
      longDescription: r.longDescription,
      images: r.images,
      amenities: r.amenities,
    }));
  } catch {
    return ROOMS;
  }
}

export async function getRoomBySlug(slug) {
  const rooms = await getRooms();
  return rooms.find((r) => r.slug === slug) || null;
}

export { ROOM_POLICY };
