import { createSingletonHandlers } from "@/lib/apiFactory";
import HomepageContent from "@/lib/models/HomepageContent";
import { HERO_CONTENT, ABOUT_TEASER, WHY_CHOOSE_US } from "@/lib/data/homepage";
import { DINING_TEASER } from "@/lib/data/dining";

const defaults = {
  heroTitle: HERO_CONTENT.heroTitle,
  heroSubtitle: HERO_CONTENT.heroSubtitle,
  heroTagline: HERO_CONTENT.heroTagline,
  aboutImage: ABOUT_TEASER.image,
  aboutTitle: ABOUT_TEASER.title,
  aboutParagraphs: ABOUT_TEASER.paragraphs,
  whyChooseUs: WHY_CHOOSE_US,
  diningTeaserTitle: DINING_TEASER.title,
  diningTeaserDescription: DINING_TEASER.description,
  diningTeaserImages: DINING_TEASER.images,
};

export const { GET, PUT } = createSingletonHandlers(HomepageContent, defaults);
