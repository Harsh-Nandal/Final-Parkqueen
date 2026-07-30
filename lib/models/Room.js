import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true },
    count: { type: Number, required: true },
    priceSingle: { type: Number, required: true },
    priceDouble: { type: Number, required: true },
    shortDescription: { type: String, required: true },
    longDescription: { type: String, required: true },
    images: { type: [String], default: [] },
    amenities: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Room || mongoose.model("Room", RoomSchema);
