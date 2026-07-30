"use client";

import AdminSingletonForm from "@/components/admin/AdminSingletonForm";

const FIELDS = [
  { key: "introImage", label: "Intro Image", type: "image" },
  { key: "introTitle", label: "Intro Title", type: "text", required: true },
  { key: "introParagraphs", label: "Intro Paragraphs", type: "string-array", rows: 6 },
  { key: "introTags", label: "Intro Tags", type: "string-array" },
  {
    key: "ourStory",
    label: "Our Story Cards",
    type: "object-array",
    itemLabel: "Card",
    itemFields: [
      { key: "title", label: "Title", type: "text" },
      { key: "text", label: "Text", type: "textarea" },
    ],
  },
  {
    key: "signatureExperiences",
    label: "Signature Experiences",
    type: "object-array",
    itemLabel: "Experience",
    itemFields: [
      { key: "title", label: "Title", type: "text" },
      { key: "image", label: "Image", type: "image" },
    ],
  },
  { key: "whyChooseImage", label: "Why Choose Us Background Image", type: "image" },
  { key: "whyChooseItems", label: "Why Choose Us Items", type: "string-array" },
  {
    key: "stats",
    label: "Stats",
    type: "object-array",
    itemLabel: "Stat",
    itemFields: [
      { key: "value", label: "Value (e.g. 40+)", type: "text" },
      { key: "label", label: "Label", type: "text" },
    ],
  },
  { key: "amenitiesGrid", label: "Amenities Grid", type: "string-array" },
  {
    key: "hospitalityFeatures",
    label: "Hospitality Features",
    type: "object-array",
    itemLabel: "Feature",
    itemFields: [
      { key: "title", label: "Title", type: "text" },
      { key: "text", label: "Text", type: "textarea" },
    ],
  },
  { key: "ctaImage", label: "CTA Background Image", type: "image" },
  { key: "ctaTitle", label: "CTA Title", type: "text" },
];

export default function AboutContentAdminPage() {
  return <AdminSingletonForm resource="about-content" title="About Page Content" fields={FIELDS} />;
}
