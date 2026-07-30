import { createCollectionHandlers } from "@/lib/apiFactory";
import Message from "@/lib/models/Message";

export const { GET, POST } = createCollectionHandlers(Message, { sort: { createdAt: -1 } });
