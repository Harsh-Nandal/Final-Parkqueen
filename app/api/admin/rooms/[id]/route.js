import { createItemHandlers } from "@/lib/apiFactory";
import Room from "@/lib/models/Room";

export const { GET, PUT, DELETE } = createItemHandlers(Room);
