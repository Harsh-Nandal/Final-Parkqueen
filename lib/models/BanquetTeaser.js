import mongoose from "mongoose";

const BanquetTeaserSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    href: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.BanquetTeaser || mongoose.model("BanquetTeaser", BanquetTeaserSchema);
