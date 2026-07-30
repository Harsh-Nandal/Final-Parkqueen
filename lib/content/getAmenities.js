import { connectDB } from "@/lib/mongodb";
import Amenity from "@/lib/models/Amenity";
import { AMENITIES } from "@/lib/data/amenities";

export async function getAmenities() {
  try {
    await connectDB();
    const docs = await Amenity.find().sort({ order: 1, createdAt: 1 }).lean();
    if (docs.length === 0) return AMENITIES;

    return docs.map((a) => ({ icon: a.icon, label: a.label }));
  } catch {
    return AMENITIES;
  }
}
