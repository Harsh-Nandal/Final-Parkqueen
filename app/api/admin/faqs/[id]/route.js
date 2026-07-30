import { createItemHandlers } from "@/lib/apiFactory";
import Faq from "@/lib/models/Faq";

export const { GET, PUT, DELETE } = createItemHandlers(Faq);
