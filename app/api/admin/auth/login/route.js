import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";
import { verifyPassword, signAdminToken, ADMIN_COOKIE } from "@/lib/auth";

export async function POST(request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  let admin;
  try {
    await connectDB();
    admin = await Admin.findOne({ email: email.toLowerCase().trim() });
  } catch (err) {
    console.error("Login DB error:", err);
    return NextResponse.json({ error: "Could not reach the database. Please try again." }, { status: 503 });
  }

  if (!admin) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const valid = await verifyPassword(password, admin.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const token = signAdminToken(admin);
  const response = NextResponse.json({ name: admin.name, email: admin.email });
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
