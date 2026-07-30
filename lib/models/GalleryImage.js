import mongoose from "mongoose";

const GalleryImageSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    caption: { type: String, required: true },
    category: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.GalleryImage || mongoose.model("GalleryImage", GalleryImageSchema);
