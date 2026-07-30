"use client";

import AdminTable from "@/components/admin/AdminTable";

const FIELDS = [
  { key: "name", label: "Name", type: "text", required: true },
  { key: "email", label: "Email", type: "text", required: true },
  { key: "message", label: "Message", type: "textarea", rows: 4, required: true },
];

export default function MessagesAdminPage() {
  return <AdminTable resource="messages" title="Contact Messages" fields={FIELDS} columns={["name", "email", "message"]} />;
}
