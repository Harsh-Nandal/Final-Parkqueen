import { createCollectionHandlers } from "@/lib/apiFactory";
import Facility from "@/lib/models/Facility";

export const { GET, POST } = createCollectionHandlers(Facility);
