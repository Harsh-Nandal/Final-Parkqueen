import { connectDB } from "@/lib/mongodb";
import BanquetTeaser from "@/lib/models/BanquetTeaser";
import { BANQUET_TEASERS } from "@/lib/data/events";

export async function getBanquetTeasers() {
  try {
    await connectDB();
    const docs = await BanquetTeaser.find().sort({ order: 1, createdAt: 1 }).lean();
    if (docs.length === 0) return BANQUET_TEASERS;

    return docs.map((t) => ({
      slug: t.slug,
      title: t.title,
      description: t.description,
      image: t.image,
      href: t.href,
    }));
  } catch {
    return BANQUET_TEASERS;
  }
}
