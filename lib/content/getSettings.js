import { connectDB } from "@/lib/mongodb";
import Settings from "@/lib/models/Settings";
import { SITE, CONTACT, SOCIAL_LINKS } from "@/lib/data/site";

const fallback = {
  name: SITE.name,
  shortName: SITE.shortName,
  tagline: SITE.tagline,
  description: SITE.description,
  url: SITE.url,
  heroTitle: SITE.heroTitle,
  heroSubtitle: SITE.heroSubtitle,
  heroTagline: SITE.heroTagline,
  roomPhones: CONTACT.roomPhones,
  diningPhones: CONTACT.diningPhones,
  phones: CONTACT.phones,
  whatsapp: CONTACT.whatsapp,
  email: CONTACT.email,
  addressLines: CONTACT.addressLines,
  city: CONTACT.city,
  mapEmbedUrl: CONTACT.mapEmbedUrl,
  checkIn: CONTACT.checkIn,
  checkOut: CONTACT.checkOut,
  receptionHours: CONTACT.receptionHours,
  socialLinks: SOCIAL_LINKS,
  seoTitle: `${SITE.name} — Rohtak's Pride, Haryana's Finest`,
  seoDescription: SITE.description,
  seoImage: "https://res.cloudinary.com/dvanvxd7t/image/upload/v1783583257/parkqueen/hero.png",
};

export async function getSettings() {
  try {
    await connectDB();
    const doc = await Settings.findOne().lean();
    if (!doc) return fallback;

    return {
      name: doc.name,
      shortName: doc.shortName,
      tagline: doc.tagline,
      description: doc.description,
      url: doc.url,
      heroTitle: SITE.heroTitle,
      heroSubtitle: SITE.heroSubtitle,
      heroTagline: SITE.heroTagline,
      roomPhones: doc.roomPhones,
      diningPhones: doc.diningPhones,
      phones: doc.phones,
      whatsapp: doc.whatsapp,
      email: doc.email,
      addressLines: doc.addressLines,
      city: doc.city,
      mapEmbedUrl: doc.mapEmbedUrl,
      checkIn: doc.checkIn,
      checkOut: doc.checkOut,
      receptionHours: doc.receptionHours,
      socialLinks: doc.socialLinks,
      seoTitle: doc.seoTitle || `${doc.name} — Rohtak's Pride, Haryana's Finest`,
      seoDescription: doc.seoDescription || doc.description,
      seoImage: doc.seoImage || "https://res.cloudinary.com/dvanvxd7t/image/upload/v1783583257/parkqueen/hero.png",
    };
  } catch {
    return fallback;
  }
}
