import { ApplicationConfiguration } from "./types";
import { RetroAppUrl } from "./RetroAppUrl";

function getConfiguration(): ApplicationConfiguration {
  const backendUrl = new RetroAppUrl({
    protocol: process.env.NEXT_PUBLICBACKEND_PROTOCOL ?? "http",
    host: process.env.NEXT_PUBLICBACKEND_HOST ?? "localhost",
    port: process.env.NEXT_PUBLICBACKEND_PORT ?? "3001",
  });

  const signalingServerUrl = new RetroAppUrl({
    protocol: process.env.NEXT_PUBLICSIGNALING_SERVER_PROTOCOL ?? "http",
    host: process.env.NEXT_PUBLICSIGNALING_SERVER_HOST ?? "localhost",
    port: process.env.NEXT_PUBLICSIGNALING_SERVER_PORT ?? "3002",
  });

  return {
    logLevel: process.env.NEXT_PUBLICLOG_LEVEL ?? "info",
    backendUrl,
    signalingServerUrl,
    retro: {
      maxVoteCount: Number(process.env.NEXT_PUBLICRETRO_MAX_VOTE_COUNT) ?? 3,
    },
  };
}

export const configuration = getConfiguration();
