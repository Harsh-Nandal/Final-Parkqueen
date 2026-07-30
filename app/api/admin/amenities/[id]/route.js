import { createItemHandlers } from "@/lib/apiFactory";
import Amenity from "@/lib/models/Amenity";

export const { GET, PUT, DELETE } = createItemHandlers(Amenity);
