import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    adults: { type: Number, required: true },
    children: { type: Number, default: 0 },
    roomType: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, enum: ["new", "contacted", "confirmed", "cancelled"], default: "new" },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
