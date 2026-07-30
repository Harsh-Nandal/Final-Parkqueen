"use client";

import AdminTable from "@/components/admin/AdminTable";

const FIELDS = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "description", label: "Description", type: "textarea", rows: 3 },
  { key: "image", label: "Image", type: "image" },
  { key: "order", label: "Sort Order", type: "number" },
];

export default function OffersAdminPage() {
  return <AdminTable resource="offers" title="Offers" fields={FIELDS} columns={["title"]} />;
}
