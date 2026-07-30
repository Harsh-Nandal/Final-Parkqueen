"use client";

import AdminSingletonForm from "@/components/admin/AdminSingletonForm";

const FIELDS = [
  { key: "name", label: "Site Name", type: "text", required: true },
  { key: "shortName", label: "Short Name", type: "text" },
  { key: "tagline", label: "Tagline", type: "text" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "url", label: "Site URL", type: "text" },
  { key: "roomPhones", label: "Room Booking Phones", type: "string-array" },
  { key: "diningPhones", label: "Dining Phones", type: "string-array" },
  { key: "phones", label: "Primary Phones (shown in header)", type: "string-array" },
  { key: "whatsapp", label: "WhatsApp Number", type: "text" },
  { key: "email", label: "Contact Email", type: "text" },
  { key: "addressLines", label: "Address Lines", type: "string-array" },
  { key: "city", label: "City", type: "text" },
  { key: "mapEmbedUrl", label: "Google Maps Embed URL", type: "text" },
  { key: "checkIn", label: "Check-In Time", type: "text" },
  { key: "checkOut", label: "Check-Out Time", type: "text" },
  { key: "receptionHours", label: "Reception Hours", type: "text" },
  {
    key: "socialLinks",
    label: "Social Links",
    type: "object-array",
    itemLabel: "Link",
    itemFields: [
      { key: "label", label: "Label", type: "text" },
      { key: "href", label: "URL", type: "text" },
    ],
  },
  { key: "seoTitle", label: "Default SEO Title", type: "text" },
  { key: "seoDescription", label: "Default SEO Description", type: "textarea" },
  { key: "seoImage", label: "Default SEO / OG Image", type: "image" },
];

export default function SettingsAdminPage() {
  return <AdminSingletonForm resource="settings" title="Site Settings & SEO" fields={FIELDS} />;
}
