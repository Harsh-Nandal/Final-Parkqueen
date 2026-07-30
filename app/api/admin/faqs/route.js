import { createCollectionHandlers } from "@/lib/apiFactory";
import Faq from "@/lib/models/Faq";

export const { GET, POST } = createCollectionHandlers(Faq);
