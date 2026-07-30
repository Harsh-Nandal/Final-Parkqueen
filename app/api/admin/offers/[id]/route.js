import { createItemHandlers } from "@/lib/apiFactory";
import Offer from "@/lib/models/Offer";

export const { GET, PUT, DELETE } = createItemHandlers(Offer);
