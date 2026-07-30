import { createCollectionHandlers } from "@/lib/apiFactory";
import Testimonial from "@/lib/models/Testimonial";

export const { GET, POST } = createCollectionHandlers(Testimonial);
