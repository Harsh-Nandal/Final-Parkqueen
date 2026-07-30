import { createCollectionHandlers } from "@/lib/apiFactory";
import EventSpace from "@/lib/models/EventSpace";

export const { GET, POST } = createCollectionHandlers(EventSpace);
