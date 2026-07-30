import { connectDB } from "@/lib/mongodb";
import Facility from "@/lib/models/Facility";
import { FACILITIES } from "@/lib/data/facilities";

export async function getFacilities() {
  try {
    await connectDB();
    const docs = await Facility.find().sort({ order: 1, createdAt: 1 }).lean();
    if (docs.length === 0) return FACILITIES;

    return docs.map((f) => ({
      icon: f.icon,
      title: f.title,
      image: f.image,
      href: f.href,
      description: f.description,
    }));
  } catch {
    return FACILITIES;
  }
}
