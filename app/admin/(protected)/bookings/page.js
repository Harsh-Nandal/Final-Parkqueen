"use client";

import AdminTable from "@/components/admin/AdminTable";

const FIELDS = [
  { key: "name", label: "Name", type: "text", required: true },
  { key: "phone", label: "Phone", type: "text", required: true },
  { key: "email", label: "Email", type: "text", required: true },
  { key: "roomType", label: "Room Type", type: "text", required: true },
  { key: "checkIn", label: "Check In", type: "text", required: true },
  { key: "checkOut", label: "Check Out", type: "text", required: true },
  { key: "adults", label: "Adults", type: "number", required: true },
  { key: "children", label: "Children", type: "number" },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "new", label: "New" },
      { value: "contacted", label: "Contacted" },
      { value: "confirmed", label: "Confirmed" },
      { value: "cancelled", label: "Cancelled" },
    ],
  },
];

export default function BookingsAdminPage() {
  return (
    <AdminTable
      resource="bookings"
      title="Booking Enquiries"
      fields={FIELDS}
      columns={["name", "roomType", "checkIn", "checkOut", "status"]}
    />
  );
}
