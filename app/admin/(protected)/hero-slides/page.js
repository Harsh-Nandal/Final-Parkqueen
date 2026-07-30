"use client";

import AdminTable from "@/components/admin/AdminTable";

const FIELDS = [
  { key: "image", label: "Image", type: "image", required: true },
  { key: "order", label: "Sort Order", type: "number" },
];

export default function HeroSlidesAdminPage() {
  return <AdminTable resource="hero-slides" title="Homepage Hero Slider" fields={FIELDS} columns={["image", "order"]} />;
}
