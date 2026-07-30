"use client";

import AdminSingletonForm from "@/components/admin/AdminSingletonForm";
import { ICON_OPTIONS } from "@/lib/iconMap";

const FIELDS = [
  { key: "heroTitle", label: "Hero Title", type: "text", required: true },
  { key: "heroSubtitle", label: "Hero Subtitle", type: "text" },
  { key: "heroTagline", label: "Hero Tagline", type: "text" },
  { key: "aboutImage", label: "About Teaser Image", type: "image" },
  { key: "aboutTitle", label: "About Teaser Title", type: "text" },
  { key: "aboutParagraphs", label: "About Teaser Paragraphs", type: "string-array", rows: 6 },
  {
    key: "whyChooseUs",
    label: "Why Choose Us Cards",
    type: "object-array",
    itemLabel: "Card",
    itemFields: [
      { key: "icon", label: "Icon", type: "select", options: ICON_OPTIONS },
      { key: "title", label: "Title", type: "text" },
      { key: "text", label: "Text", type: "textarea" },
      { key: "href", label: "Link (href)", type: "text" },
    ],
  },
  { key: "diningTeaserTitle", label: "Dining Teaser Title", type: "text" },
  { key: "diningTeaserDescription", label: "Dining Teaser Description", type: "textarea" },
  { key: "diningTeaserImages", label: "Dining Teaser Images", type: "image-array" },
];

export default function HomepageAdminPage() {
  return <AdminSingletonForm resource="homepage" title="Homepage Sections" fields={FIELDS} />;
}
