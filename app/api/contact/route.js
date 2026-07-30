import { connectDB } from "@/lib/mongodb";
import Message from "@/lib/models/Message";
import { sendContactEmails } from "@/lib/mailer";

export async function POST(request) {
  const body = await request.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return Response.json({ error: "Name, email and message are required." }, { status: 400 });
  }

  try {
    await connectDB();
    await Message.create({ name, email, message });
  } catch (err) {
    console.error("Failed to save contact message:", err);
    return Response.json({ error: "Could not save your message. Please try again later." }, { status: 500 });
  }

  try {
    await sendContactEmails({ name, email, message });
  } catch (err) {
    console.error("Failed to send contact emails:", err);
  }

  return Response.json({ success: true }, { status: 201 });
}
