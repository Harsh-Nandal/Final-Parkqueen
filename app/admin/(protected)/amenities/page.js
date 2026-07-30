"use client";

import AdminTable from "@/components/admin/AdminTable";
import { ICON_OPTIONS } from "@/lib/iconMap";

const FIELDS = [
  { key: "label", label: "Label", type: "text", required: true },
  { key: "icon", label: "Icon", type: "select", options: ICON_OPTIONS },
  { key: "order", label: "Sort Order", type: "number" },
];

export default function AmenitiesAdminPage() {
  return <AdminTable resource="amenities" title="Room Amenities" fields={FIELDS} columns={["label", "icon"]} />;
}
