import { createItemHandlers } from "@/lib/apiFactory";
import Message from "@/lib/models/Message";

export const { GET, PUT, DELETE } = createItemHandlers(Message);
