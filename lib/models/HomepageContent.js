import mongoose from "mongoose";

const WhyChooseItemSchema = new mongoose.Schema(
  {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    href: { type: String, required: true },
  },
  { _id: false }
);

const HomepageContentSchema = new mongoose.Schema(
  {
    heroTitle: { type: String, required: true },
    heroSubtitle: { type: String, required: true },
    heroTagline: { type: String, required: true },
    aboutImage: { type: String, required: true },
    aboutTitle: { type: String, required: true },
    aboutParagraphs: { type: [String], default: [] },
    whyChooseUs: { type: [WhyChooseItemSchema], default: [] },
    diningTeaserTitle: { type: String, required: true },
    diningTeaserDescription: { type: String, required: true },
    diningTeaserImages: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.HomepageContent || mongoose.model("HomepageContent", HomepageContentSchema);
