"use client";

import AdminTable from "@/components/admin/AdminTable";

const FIELDS = [
  { key: "slug", label: "Slug", type: "text", required: true },
  { key: "title", label: "Title", type: "text", required: true },
  { key: "description", label: "Description", type: "textarea", rows: 3 },
  { key: "image", label: "Image", type: "image" },
  { key: "href", label: "Link (href)", type: "text" },
  { key: "order", label: "Sort Order", type: "number" },
];

export default function BanquetTeasersAdminPage() {
  return <AdminTable resource="banquet-teasers" title="Homepage Banquet Teasers" fields={FIELDS} columns={["title", "href"]} />;
}
