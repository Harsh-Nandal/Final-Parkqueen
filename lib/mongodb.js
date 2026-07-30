import mongoose from "mongoose";

const cached = global._mongoose ?? (global._mongoose = { conn: null, promise: null });

const CONNECT_TIMEOUT_MS = 8000;

export async function connectDB() {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set — add it to .env");
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
        bufferCommands: false,
        serverSelectionTimeoutMS: CONNECT_TIMEOUT_MS,
        connectTimeoutMS: CONNECT_TIMEOUT_MS,
      })
      .then((m) => m);
  }

  try {
    // Some environments (slow/blocked TLS handshakes, restrictive networks)
    // can leave the driver's own connect promise hanging well past its
    // configured timeouts. Race it against a hard local timeout so build-time
    // callers always get a fast rejection and can fall back to static data
    // instead of stalling the page past Next's static-generation limit.
    cached.conn = await Promise.race([
      cached.promise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("MongoDB connection timed out")), CONNECT_TIMEOUT_MS)
      ),
    ]);
  } catch (err) {
    // Don't let a transient failure poison every future call — let the next
    // request try a fresh connection instead of re-throwing this forever.
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}
