import { ApplicationConfiguration } from "./types";
import { RetroAppUrl } from "./RetroAppUrl";

function getConfiguration(): ApplicationConfiguration {
  const backendUrl = new RetroAppUrl({
    protocol: process.env.REACT_APP_BACKEND_PROTOCOL,
    host: process.env.REACT_APP_BACKEND_HOST,
    port: process.env.REACT_APP_BACKEND_PORT,
  });

  const signalingServerUrl = new RetroAppUrl({
    protocol: process.env.REACT_APP_SIGNALING_SERVER_PROTOCOL,
    host: process.env.REACT_APP_SIGNALING_SERVER_HOST,
    port: process.env.REACT_APP_SIGNALING_SERVER_PORT,
  });

  return {
    logLevel: process.env.REACT_APP_LOG_LEVEL ?? "info",
    backendUrl,
    signalingServerUrl,
    retro: {
      maxVoteCount: Number(process.env.REACT_APP_RETRO_MAX_VOTE_COUNT) ?? 3,
    },
  };
}

export const configuration = getConfiguration();
