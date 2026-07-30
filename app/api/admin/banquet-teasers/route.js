import { createCollectionHandlers } from "@/lib/apiFactory";
import BanquetTeaser from "@/lib/models/BanquetTeaser";

export const { GET, POST } = createCollectionHandlers(BanquetTeaser);
