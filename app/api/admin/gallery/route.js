import { createCollectionHandlers } from "@/lib/apiFactory";
import GalleryImage from "@/lib/models/GalleryImage";

export const { GET, POST } = createCollectionHandlers(GalleryImage);
