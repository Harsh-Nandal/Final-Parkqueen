"use client";

import AdminTable from "@/components/admin/AdminTable";

const FIELDS = [
  { key: "question", label: "Question", type: "text", required: true },
  { key: "answer", label: "Answer", type: "textarea", rows: 3 },
  { key: "order", label: "Sort Order", type: "number" },
];

export default function FaqsAdminPage() {
  return <AdminTable resource="faqs" title="FAQs" fields={FIELDS} columns={["question"]} />;
}
