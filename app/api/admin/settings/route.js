import { createSingletonHandlers } from "@/lib/apiFactory";
import Settings from "@/lib/models/Settings";
import { SITE, CONTACT, SOCIAL_LINKS } from "@/lib/data/site";

const defaults = {
  name: SITE.name,
  shortName: SITE.shortName,
  tagline: SITE.tagline,
  description: SITE.description,
  url: SITE.url,
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

export const { GET, PUT } = createSingletonHandlers(Settings, defaults);
