import { createReactClient } from "@livepeer/react";
import { studioProvider } from "livepeer/providers/studio";

const LivePeerClient = createReactClient({
    provider: studioProvider({ apiKey: process.env.LIVEPEER_API_KEY }),
});

export default LivePeerClient;
