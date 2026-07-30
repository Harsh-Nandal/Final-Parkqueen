import mongoose from "mongoose";

const FacilitySchema = new mongoose.Schema(
  {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    href: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Facility || mongoose.model("Facility", FacilitySchema);
