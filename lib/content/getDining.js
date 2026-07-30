import { connectDB } from "@/lib/mongodb";
import DiningVenue from "@/lib/models/DiningVenue";
import { DINING_VENUES } from "@/lib/data/dining";

export async function getDiningVenues() {
  try {
    await connectDB();
    const docs = await DiningVenue.find().sort({ order: 1, createdAt: 1 }).lean();
    if (docs.length === 0) return DINING_VENUES;

    return docs.map((v) => ({
      slug: v.slug,
      name: v.name,
      image: v.image,
      description: v.description,
      tags: v.tags,
      hours: v.hours,
    }));
  } catch {
    return DINING_VENUES;
  }
}
