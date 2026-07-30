"use client";

import AdminTable from "@/components/admin/AdminTable";
import { ICON_OPTIONS } from "@/lib/iconMap";

const FIELDS = [
  { key: "slug", label: "Slug", type: "text", required: true },
  { key: "name", label: "Name", type: "text", required: true },
  { key: "icon", label: "Icon", type: "select", options: ICON_OPTIONS },
  { key: "capacity", label: "Capacity", type: "text" },
  { key: "description", label: "Description", type: "textarea", rows: 3 },
  { key: "features", label: "Features", type: "string-array" },
  { key: "order", label: "Sort Order", type: "number" },
];

export default function EventSpacesAdminPage() {
  return <AdminTable resource="event-spaces" title="Event Spaces" fields={FIELDS} columns={["name", "capacity"]} />;
}
