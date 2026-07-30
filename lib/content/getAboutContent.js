import { connectDB } from "@/lib/mongodb";
import AboutContent from "@/lib/models/AboutContent";
import {
  ABOUT_INTRO,
  OUR_STORY,
  SIGNATURE_EXPERIENCES,
  WHY_CHOOSE_PARKQUEEN,
  ABOUT_STATS,
  ABOUT_AMENITIES,
  HOSPITALITY_FEATURES,
  ABOUT_CTA,
} from "@/lib/data/about";

const fallback = {
  intro: ABOUT_INTRO,
  ourStory: OUR_STORY,
  signatureExperiences: SIGNATURE_EXPERIENCES,
  whyChoose: WHY_CHOOSE_PARKQUEEN,
  stats: ABOUT_STATS,
  amenitiesGrid: ABOUT_AMENITIES,
  hospitalityFeatures: HOSPITALITY_FEATURES,
  cta: ABOUT_CTA,
};

export async function getAboutContent() {
  try {
    await connectDB();
    const doc = await AboutContent.findOne().lean();
    if (!doc) return fallback;

    return {
      intro: { image: doc.introImage, title: doc.introTitle, paragraphs: doc.introParagraphs, tags: doc.introTags },
      ourStory: doc.ourStory,
      signatureExperiences: doc.signatureExperiences,
      whyChoose: { image: doc.whyChooseImage, items: doc.whyChooseItems },
      stats: doc.stats,
      amenitiesGrid: doc.amenitiesGrid,
      hospitalityFeatures: doc.hospitalityFeatures,
      cta: { image: doc.ctaImage, title: doc.ctaTitle },
    };
  } catch {
    return fallback;
  }
}
