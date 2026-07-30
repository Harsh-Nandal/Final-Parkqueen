import { createSingletonHandlers } from "@/lib/apiFactory";
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

const defaults = {
  introImage: ABOUT_INTRO.image,
  introTitle: ABOUT_INTRO.title,
  introParagraphs: ABOUT_INTRO.paragraphs,
  introTags: ABOUT_INTRO.tags,
  ourStory: OUR_STORY,
  signatureExperiences: SIGNATURE_EXPERIENCES,
  whyChooseImage: WHY_CHOOSE_PARKQUEEN.image,
  whyChooseItems: WHY_CHOOSE_PARKQUEEN.items,
  stats: ABOUT_STATS,
  amenitiesGrid: ABOUT_AMENITIES,
  hospitalityFeatures: HOSPITALITY_FEATURES,
  ctaImage: ABOUT_CTA.image,
  ctaTitle: ABOUT_CTA.title,
};

export const { GET, PUT } = createSingletonHandlers(AboutContent, defaults);
