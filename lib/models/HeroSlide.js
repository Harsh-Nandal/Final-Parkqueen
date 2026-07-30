import mongoose from "mongoose";

const HeroSlideSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.HeroSlide || mongoose.model("HeroSlide", HeroSlideSchema);
