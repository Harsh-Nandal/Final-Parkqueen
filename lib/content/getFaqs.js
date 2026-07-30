import { connectDB } from "@/lib/mongodb";
import Faq from "@/lib/models/Faq";
import { FAQS } from "@/lib/data/faqs";

export async function getFaqs() {
  try {
    await connectDB();
    const docs = await Faq.find().sort({ order: 1, createdAt: 1 }).lean();
    if (docs.length === 0) return FAQS;

    return docs.map((f) => ({ question: f.question, answer: f.answer }));
  } catch {
    return FAQS;
  }
}
