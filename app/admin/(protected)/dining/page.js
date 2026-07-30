"use client";

import AdminTable from "@/components/admin/AdminTable";

const FIELDS = [
  { key: "slug", label: "Slug", type: "text", required: true },
  { key: "name", label: "Name", type: "text", required: true },
  { key: "image", label: "Image", type: "image" },
  { key: "description", label: "Description", type: "textarea", rows: 3 },
  { key: "tags", label: "Tags", type: "string-array" },
  { key: "hours", label: "Hours", type: "string-array" },
  { key: "order", label: "Sort Order", type: "number" },
];

export default function DiningAdminPage() {
  return <AdminTable resource="dining" title="Dining Venues" fields={FIELDS} columns={["name", "slug"]} />;
}
