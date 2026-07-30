import { connectDB } from "@/lib/mongodb";
import Offer from "@/lib/models/Offer";
import { OFFERS } from "@/lib/data/offers";

export async function getOffers() {
  try {
    await connectDB();
    const docs = await Offer.find().sort({ order: 1, createdAt: 1 }).lean();
    if (docs.length === 0) return OFFERS;

    return docs.map((o) => ({ title: o.title, description: o.description, image: o.image }));
  } catch {
    return OFFERS;
  }
}
