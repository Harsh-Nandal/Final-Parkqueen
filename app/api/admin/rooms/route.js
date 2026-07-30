import { createCollectionHandlers } from "@/lib/apiFactory";
import Room from "@/lib/models/Room";

export const { GET, POST } = createCollectionHandlers(Room);
