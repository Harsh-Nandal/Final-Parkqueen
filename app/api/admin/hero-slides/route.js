import { createCollectionHandlers } from "@/lib/apiFactory";
import HeroSlide from "@/lib/models/HeroSlide";

export const { GET, POST } = createCollectionHandlers(HeroSlide);
