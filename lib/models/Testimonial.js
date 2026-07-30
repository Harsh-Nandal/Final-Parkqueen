import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    location: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    quote: { type: String, required: true },
    note: { type: String, default: "" },
    page: { type: String, enum: ["home", "about"], default: "home" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);
