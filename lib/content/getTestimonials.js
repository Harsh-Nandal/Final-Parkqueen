import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/lib/models/Testimonial";
import { TESTIMONIALS_HOME, TESTIMONIALS_ABOUT } from "@/lib/data/testimonials";

export async function getTestimonials(page = "home") {
  const fallback = page === "about" ? TESTIMONIALS_ABOUT : TESTIMONIALS_HOME;

  try {
    await connectDB();
    const docs = await Testimonial.find({ page }).sort({ order: 1, createdAt: 1 }).lean();
    if (docs.length === 0) return fallback;

    return docs.map((t) => ({
      author: t.author,
      location: t.location,
      rating: t.rating,
      quote: t.quote,
      note: t.note,
    }));
  } catch {
    return fallback;
  }
}
