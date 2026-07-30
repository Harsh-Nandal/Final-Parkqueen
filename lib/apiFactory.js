import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function dbUnavailable(err) {
  console.error("Database error:", err);
  return NextResponse.json({ error: "Could not reach the database. Please try again." }, { status: 503 });
}

/** For app/api/admin/<collection>/route.js — list + create. */
export function createCollectionHandlers(Model, { sort = { order: 1, createdAt: 1 } } = {}) {
  async function GET() {
    if (!(await requireAdmin())) return unauthorized();
    try {
      await connectDB();
      const items = await Model.find().sort(sort).lean();
      return NextResponse.json(items);
    } catch (err) {
      return dbUnavailable(err);
    }
  }

  async function POST(request) {
    if (!(await requireAdmin())) return unauthorized();
    const body = await request.json();
    try {
      await connectDB();
      const item = await Model.create(body);
      return NextResponse.json(item, { status: 201 });
    } catch (err) {
      if (err.code === "ETIMEOUT" || err.name === "MongooseServerSelectionError") return dbUnavailable(err);
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
  }

  return { GET, POST };
}

/** For app/api/admin/<collection>/[id]/route.js — read/update/delete one. */
export function createItemHandlers(Model) {
  async function GET(request, { params }) {
    if (!(await requireAdmin())) return unauthorized();
    const { id } = await params;
    try {
      await connectDB();
      const item = await Model.findById(id).lean();
      if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(item);
    } catch (err) {
      return dbUnavailable(err);
    }
  }

  async function PUT(request, { params }) {
    if (!(await requireAdmin())) return unauthorized();
    const { id } = await params;
    const body = await request.json();
    try {
      await connectDB();
      const item = await Model.findByIdAndUpdate(id, body, { new: true, runValidators: true });
      if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(item);
    } catch (err) {
      if (err.code === "ETIMEOUT" || err.name === "MongooseServerSelectionError") return dbUnavailable(err);
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
  }

  async function DELETE(request, { params }) {
    if (!(await requireAdmin())) return unauthorized();
    const { id } = await params;
    try {
      await connectDB();
      const deleted = await Model.findByIdAndDelete(id);
      if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json({ success: true });
    } catch (err) {
      return dbUnavailable(err);
    }
  }

  return { GET, PUT, DELETE };
}

/** For singleton documents (Settings, HomepageContent, AboutContent) — one doc, get-or-create + update. */
export function createSingletonHandlers(Model, defaults) {
  async function getOrCreate() {
    await connectDB();
    let doc = await Model.findOne();
    if (!doc) doc = await Model.create(defaults);
    return doc;
  }

  async function GET() {
    if (!(await requireAdmin())) return unauthorized();
    try {
      const doc = await getOrCreate();
      return NextResponse.json(doc);
    } catch (err) {
      return dbUnavailable(err);
    }
  }

  async function PUT(request) {
    if (!(await requireAdmin())) return unauthorized();
    const body = await request.json();
    try {
      const doc = await getOrCreate();
      Object.assign(doc, body);
      await doc.save();
      return NextResponse.json(doc);
    } catch (err) {
      if (err.code === "ETIMEOUT" || err.name === "MongooseServerSelectionError") return dbUnavailable(err);
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
  }

  return { GET, PUT };
}
