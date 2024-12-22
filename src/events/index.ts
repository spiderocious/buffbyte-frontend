import { createBus } from "connectic";

interface Events {
  "active:content": { contentType: string };
}

export const bus = createBus<Events>({
  name: "BUFFBUS",
  debug: true,
});
