import { createItemHandlers } from "@/lib/apiFactory";
import EventSpace from "@/lib/models/EventSpace";

export const { GET, PUT, DELETE } = createItemHandlers(EventSpace);
