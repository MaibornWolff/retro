import { ApplicationConfiguration } from "./types";
import { RetroAppUrl } from "./RetroAppUrl";

function getConfiguration(): ApplicationConfiguration {
  const backendUrl = new RetroAppUrl({
    protocol: process.env.NEXT_PUBLIC_BACKEND_PROTOCOL ?? "http",
    host: process.env.NEXT_PUBLIC_BACKEND_HOST ?? "localhost",
    port: process.env.NEXT_PUBLIC_BACKEND_PORT ?? "3001",
  });

  const signalingServerUrl = new RetroAppUrl({
    protocol: process.env.NEXT_PUBLIC_SIGNALING_SERVER_PROTOCOL ?? "http",
    host: process.env.NEXT_PUBLIC_SIGNALING_SERVER_HOST ?? "localhost",
    port: process.env.NEXT_PUBLIC_SIGNALING_SERVER_PORT ?? "3002",
  });

  return {
    logLevel: process.env.NEXT_PUBLIC_LOG_LEVEL ?? "info",
    backendUrl,
    signalingServerUrl,
    retro: {
      maxVoteCount: Number(process.env.NEXT_PUBLIC_RETRO_MAX_VOTE_COUNT) ?? 3,
    },
  };
}

export const configuration = getConfiguration();
