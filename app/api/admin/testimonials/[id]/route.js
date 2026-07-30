import { createItemHandlers } from "@/lib/apiFactory";
import Testimonial from "@/lib/models/Testimonial";

export const { GET, PUT, DELETE } = createItemHandlers(Testimonial);
