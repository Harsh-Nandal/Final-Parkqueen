import mongoose from "mongoose";

const AmenitySchema = new mongoose.Schema(
  {
    icon: { type: String, required: true },
    label: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Amenity || mongoose.model("Amenity", AmenitySchema);
