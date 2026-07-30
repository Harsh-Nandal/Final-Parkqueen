import { createItemHandlers } from "@/lib/apiFactory";
import GalleryImage from "@/lib/models/GalleryImage";

export const { GET, PUT, DELETE } = createItemHandlers(GalleryImage);
