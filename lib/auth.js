import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const ADMIN_COOKIE = "pq_admin_token";

function secret() {
  const value = process.env.JWT_SECRET;
  if (!value) throw new Error("JWT_SECRET is not set — add it to .env.local");
  return value;
}

export function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export function signAdminToken(admin) {
  return jwt.sign(
    { id: admin._id.toString(), email: admin.email, name: admin.name },
    secret(),
    { expiresIn: "7d" }
  );
}

export function verifyAdminToken(token) {
  try {
    return jwt.verify(token, secret());
  } catch {
    return null;
  }
}

/** Server Components / Route Handlers: read + verify the admin session cookie. */
export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

/** Route Handlers: returns the admin session, or null if unauthenticated. */
export async function requireAdmin() {
  return getAdminSession();
}
