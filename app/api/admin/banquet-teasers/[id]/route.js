import { createItemHandlers } from "@/lib/apiFactory";
import BanquetTeaser from "@/lib/models/BanquetTeaser";

export const { GET, PUT, DELETE } = createItemHandlers(BanquetTeaser);
