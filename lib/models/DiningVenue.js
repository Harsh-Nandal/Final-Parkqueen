import mongoose from "mongoose";

const DiningVenueSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], default: [] },
    hours: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.DiningVenue || mongoose.model("DiningVenue", DiningVenueSchema);
