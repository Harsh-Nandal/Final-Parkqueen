import { connectDB } from "@/lib/mongodb";
import EventSpace from "@/lib/models/EventSpace";
import { EVENT_SPACES } from "@/lib/data/banquets";

export async function getEventSpaces() {
  try {
    await connectDB();
    const docs = await EventSpace.find().sort({ order: 1, createdAt: 1 }).lean();
    if (docs.length === 0) return EVENT_SPACES;

    return docs.map((s) => ({
      slug: s.slug,
      name: s.name,
      icon: s.icon,
      capacity: s.capacity,
      description: s.description,
      features: s.features,
    }));
  } catch {
    return EVENT_SPACES;
  }
}
