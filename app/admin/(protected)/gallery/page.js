"use client";

import AdminTable from "@/components/admin/AdminTable";

const FIELDS = [
  { key: "image", label: "Image", type: "image", required: true },
  { key: "caption", label: "Caption", type: "text" },
  { key: "category", label: "Category", type: "select", options: [
    { value: "Interiors", label: "Interiors" },
    { value: "Rooms", label: "Rooms" },
    { value: "Dining", label: "Dining" },
    { value: "Events", label: "Events" },
    { value: "Exterior", label: "Exterior" },
  ] },
  { key: "order", label: "Sort Order", type: "number" },
];

export default function GalleryAdminPage() {
  return <AdminTable resource="gallery" title="Gallery" fields={FIELDS} columns={["caption", "category"]} />;
}
