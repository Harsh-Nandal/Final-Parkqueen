"use client";

import AdminTable from "@/components/admin/AdminTable";

const FIELDS = [
  { key: "slug", label: "Slug", type: "text", required: true },
  { key: "name", label: "Name", type: "text", required: true },
  { key: "count", label: "Room Count", type: "number", required: true },
  { key: "priceSingle", label: "Price (Single)", type: "number", required: true },
  { key: "priceDouble", label: "Price (Double)", type: "number", required: true },
  { key: "shortDescription", label: "Short Description", type: "textarea", rows: 2 },
  { key: "longDescription", label: "Long Description", type: "textarea", rows: 4 },
  { key: "images", label: "Images", type: "image-array" },
  { key: "amenities", label: "Amenities", type: "string-array" },
  { key: "order", label: "Sort Order", type: "number" },
];

export default function RoomsAdminPage() {
  return <AdminTable resource="rooms" title="Rooms" fields={FIELDS} columns={["name", "priceSingle", "priceDouble"]} />;
}
