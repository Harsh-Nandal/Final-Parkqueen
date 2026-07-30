import { createItemHandlers } from "@/lib/apiFactory";
import Facility from "@/lib/models/Facility";

export const { GET, PUT, DELETE } = createItemHandlers(Facility);
