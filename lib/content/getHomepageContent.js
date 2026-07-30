import { connectDB } from "@/lib/mongodb";
import HomepageContent from "@/lib/models/HomepageContent";
import { HERO_CONTENT, ABOUT_TEASER, WHY_CHOOSE_US } from "@/lib/data/homepage";
import { DINING_TEASER } from "@/lib/data/dining";

const fallback = {
  hero: HERO_CONTENT,
  about: ABOUT_TEASER,
  whyChooseUs: WHY_CHOOSE_US,
  dining: DINING_TEASER,
};

export async function getHomepageContent() {
  try {
    await connectDB();
    const doc = await HomepageContent.findOne().lean();
    if (!doc) return fallback;

    return {
      hero: { heroTitle: doc.heroTitle, heroSubtitle: doc.heroSubtitle, heroTagline: doc.heroTagline },
      about: { image: doc.aboutImage, title: doc.aboutTitle, paragraphs: doc.aboutParagraphs },
      whyChooseUs: doc.whyChooseUs.map((item) => ({
        icon: item.icon,
        title: item.title,
        text: item.text,
        href: item.href,
      })),
      dining: { title: doc.diningTeaserTitle, description: doc.diningTeaserDescription, images: doc.diningTeaserImages },
    };
  } catch {
    return fallback;
  }
}
