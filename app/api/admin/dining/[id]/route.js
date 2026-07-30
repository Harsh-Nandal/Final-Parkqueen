import { createItemHandlers } from "@/lib/apiFactory";
import DiningVenue from "@/lib/models/DiningVenue";

export const { GET, PUT, DELETE } = createItemHandlers(DiningVenue);
