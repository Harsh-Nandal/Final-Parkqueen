import { createCollectionHandlers } from "@/lib/apiFactory";
import Booking from "@/lib/models/Booking";

export const { GET, POST } = createCollectionHandlers(Booking, { sort: { createdAt: -1 } });
