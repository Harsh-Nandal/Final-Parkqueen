import { createCollectionHandlers } from "@/lib/apiFactory";
import Amenity from "@/lib/models/Amenity";

export const { GET, POST } = createCollectionHandlers(Amenity);
