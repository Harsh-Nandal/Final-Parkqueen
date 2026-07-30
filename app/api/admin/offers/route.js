import { createCollectionHandlers } from "@/lib/apiFactory";
import Offer from "@/lib/models/Offer";

export const { GET, POST } = createCollectionHandlers(Offer);
