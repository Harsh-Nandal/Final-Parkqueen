import mongoose from "mongoose";

const EventSpaceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true },
    icon: { type: String, required: true },
    capacity: { type: String, required: true },
    description: { type: String, required: true },
    features: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.EventSpace || mongoose.model("EventSpace", EventSpaceSchema);
