import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";
import { requireAdmin, hashPassword } from "@/lib/auth";

function dbUnavailable(err) {
  console.error("Database error:", err);
  return NextResponse.json({ error: "Could not reach the database. Please try again." }, { status: 503 });
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const admin = await Admin.findById(session.id).select("name email");
    return NextResponse.json(admin);
  } catch (err) {
    return dbUnavailable(err);
  }
}

export async function PUT(request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, email, password } = await request.json();

  try {
    await connectDB();
    const admin = await Admin.findById(session.id);
    if (!admin) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (name) admin.name = name;
    if (email) admin.email = email.toLowerCase().trim();
    if (password) admin.passwordHash = await hashPassword(password);

    await admin.save();
    return NextResponse.json({ name: admin.name, email: admin.email });
  } catch (err) {
    return dbUnavailable(err);
  }
}
