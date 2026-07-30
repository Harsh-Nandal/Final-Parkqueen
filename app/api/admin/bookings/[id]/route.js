import { createItemHandlers } from "@/lib/apiFactory";
import Booking from "@/lib/models/Booking";

export const { GET, PUT, DELETE } = createItemHandlers(Booking);
