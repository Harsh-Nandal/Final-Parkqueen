import { createCollectionHandlers } from "@/lib/apiFactory";
import DiningVenue from "@/lib/models/DiningVenue";

export const { GET, POST } = createCollectionHandlers(DiningVenue);
