import { createItemHandlers } from "@/lib/apiFactory";
import HeroSlide from "@/lib/models/HeroSlide";

export const { GET, PUT, DELETE } = createItemHandlers(HeroSlide);
