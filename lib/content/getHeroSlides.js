import { connectDB } from "@/lib/mongodb";
import HeroSlide from "@/lib/models/HeroSlide";
import { HERO_SLIDES } from "@/lib/data/homepage";

export async function getHeroSlides() {
  try {
    await connectDB();
    const docs = await HeroSlide.find().sort({ order: 1, createdAt: 1 }).lean();
    if (docs.length === 0) return HERO_SLIDES;

    return docs.map((s) => s.image);
  } catch {
    return HERO_SLIDES;
  }
}
