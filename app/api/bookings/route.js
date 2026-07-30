import { connectDB } from "@/lib/mongodb";
import Booking from "@/lib/models/Booking";
import { sendBookingEmails } from "@/lib/mailer";

export async function POST(request) {
  const body = await request.json();
  const { checkIn, checkOut, adults, children, roomType, name, phone, email } = body;

  if (!checkIn || !checkOut || !adults || !roomType || !name || !phone || !email) {
    return Response.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  try {
    await connectDB();
    await Booking.create({
      checkIn,
      checkOut,
      adults: Number(adults),
      children: Number(children) || 0,
      roomType,
      name,
      phone,
      email,
    });
  } catch (err) {
    console.error("Failed to save booking enquiry:", err);
    return Response.json({ error: "Could not save your enquiry. Please try again later." }, { status: 500 });
  }

  try {
    await sendBookingEmails({ checkIn, checkOut, adults, children, roomType, name, phone, email });
  } catch (err) {
    console.error("Failed to send booking emails:", err);
  }

  return Response.json({ success: true }, { status: 201 });
}
