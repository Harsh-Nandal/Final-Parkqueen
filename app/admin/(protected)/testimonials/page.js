"use client";

import AdminTable from "@/components/admin/AdminTable";

const FIELDS = [
  { key: "author", label: "Author", type: "text", required: true },
  { key: "location", label: "Location", type: "text" },
  { key: "rating", label: "Rating (1-5)", type: "number", required: true },
  { key: "quote", label: "Quote", type: "textarea", rows: 3 },
  { key: "note", label: "Note (e.g. Wedding guest)", type: "text" },
  {
    key: "page",
    label: "Shown On",
    type: "select",
    options: [
      { value: "home", label: "Home" },
      { value: "about", label: "About" },
    ],
  },
  { key: "order", label: "Sort Order", type: "number" },
];

export default function TestimonialsAdminPage() {
  return <AdminTable resource="testimonials" title="Testimonials" fields={FIELDS} columns={["author", "location", "page"]} />;
}
