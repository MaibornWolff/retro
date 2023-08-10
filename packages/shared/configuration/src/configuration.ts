import { ApplicationConfiguration, CorsOrigins } from "./types";
import { RetroAppUrl } from "./RetroAppUrl";

export const configuration = getConfiguration();

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
    corsOrigins: parseCorsOrigins(process.env.CORS_ORIGIN) ?? "*",
  };
}

function parseCorsOrigins(list?: string): CorsOrigins | undefined {
  if (!list) return undefined;

  const origins = list.split(",").map((origin) => origin.trim());
  if (origins.length <= 1) return list;
  return origins;
}
