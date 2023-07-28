import { ApplicationConfiguration, CorsOrigins } from "./types";
import { RetroAppUrl } from "./RetroAppUrl";

export const configuration = getConfiguration();

function getConfiguration(): ApplicationConfiguration {
  const backendUrl = new RetroAppUrl({
    protocol: process.env.REACT_APP_BACKEND_PROTOCOL ?? "http",
    host: process.env.REACT_APP_BACKEND_HOST ?? "localhost",
    port: process.env.REACT_APP_BACKEND_PORT ?? "3001",
  });

  const signalingServerUrl = new RetroAppUrl({
    protocol: process.env.REACT_APP_SIGNALING_SERVER_PROTOCOL ?? "http",
    host: process.env.REACT_APP_SIGNALING_SERVER_HOST ?? "localhost",
    port: process.env.REACT_APP_SIGNALING_SERVER_PORT ?? "3002",
  });

  return {
    logLevel: process.env.REACT_APP_LOG_LEVEL ?? "info",
    backendUrl,
    signalingServerUrl,
    retro: {
      maxVoteCount: Number(process.env.REACT_APP_RETRO_MAX_VOTE_COUNT) ?? 3,
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
