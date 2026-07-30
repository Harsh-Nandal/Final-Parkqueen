import mongoose from "mongoose";

const SocialLinkSchema = new mongoose.Schema({ label: { type: String, required: true }, href: { type: String, required: true } }, { _id: false });

const SettingsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    roomPhones: { type: [String], default: [] },
    diningPhones: { type: [String], default: [] },
    phones: { type: [String], default: [] },
    whatsapp: { type: String, default: "" },
    email: { type: String, required: true },
    addressLines: { type: [String], default: [] },
    city: { type: String, required: true },
    mapEmbedUrl: { type: String, required: true },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    receptionHours: { type: String, required: true },
    socialLinks: { type: [SocialLinkSchema], default: [] },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    seoImage: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);
