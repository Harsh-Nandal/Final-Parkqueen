"use client";

import AdminTable from "@/components/admin/AdminTable";
import { ICON_OPTIONS } from "@/lib/iconMap";

const FIELDS = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "icon", label: "Icon", type: "select", options: ICON_OPTIONS },
  { key: "image", label: "Image", type: "image" },
  { key: "href", label: "Link (href)", type: "text" },
  { key: "description", label: "Description", type: "textarea", rows: 3 },
  { key: "order", label: "Sort Order", type: "number" },
];

export default function FacilitiesAdminPage() {
  return <AdminTable resource="facilities" title="Facilities" fields={FIELDS} columns={["title", "href"]} />;
}
