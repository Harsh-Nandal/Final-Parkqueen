import mongoose from "mongoose";

const TitleTextSchema = new mongoose.Schema({ title: { type: String, required: true }, text: { type: String, required: true } }, { _id: false });
const ImageTitleSchema = new mongoose.Schema({ title: { type: String, required: true }, image: { type: String, required: true } }, { _id: false });
const StatSchema = new mongoose.Schema({ value: { type: String, required: true }, label: { type: String, required: true } }, { _id: false });

const AboutContentSchema = new mongoose.Schema(
  {
    introImage: { type: String, required: true },
    introTitle: { type: String, required: true },
    introParagraphs: { type: [String], default: [] },
    introTags: { type: [String], default: [] },
    ourStory: { type: [TitleTextSchema], default: [] },
    signatureExperiences: { type: [ImageTitleSchema], default: [] },
    whyChooseImage: { type: String, required: true },
    whyChooseItems: { type: [String], default: [] },
    stats: { type: [StatSchema], default: [] },
    amenitiesGrid: { type: [String], default: [] },
    hospitalityFeatures: { type: [TitleTextSchema], default: [] },
    ctaImage: { type: String, required: true },
    ctaTitle: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.AboutContent || mongoose.model("AboutContent", AboutContentSchema);
