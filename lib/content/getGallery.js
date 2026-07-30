import { connectDB } from "@/lib/mongodb";
import GalleryImage from "@/lib/models/GalleryImage";
import { GALLERY_IMAGES, GALLERY_CATEGORIES } from "@/lib/data/gallery";

export async function getGalleryImages() {
  try {
    await connectDB();
    const docs = await GalleryImage.find().sort({ order: 1, createdAt: 1 }).lean();
    if (docs.length === 0) return { images: GALLERY_IMAGES, categories: GALLERY_CATEGORIES };

    const images = docs.map((g) => ({ image: g.image, caption: g.caption, category: g.category }));
    const categories = ["All", ...new Set(images.map((i) => i.category))];
    return { images, categories };
  } catch {
    return { images: GALLERY_IMAGES, categories: GALLERY_CATEGORIES };
  }
}
