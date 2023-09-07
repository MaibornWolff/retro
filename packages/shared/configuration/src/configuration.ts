import { ApplicationConfiguration, CorsOrigins, LogLevel } from "./types";
import { RetroAppUrl } from "./RetroAppUrl";

export const configuration = getConfiguration();

function getConfiguration(): ApplicationConfiguration {
  const backendUrl = new RetroAppUrl({
    protocol: process.env.BACKEND_PROTOCOL ?? "http",
    host: process.env.BACKEND_HOST ?? "localhost",
    port: process.env.BACKEND_PORT ?? "3001",
  });

  const signalingServerUrl = new RetroAppUrl({
    protocol: process.env.SIGNALING_SERVER_PROTOCOL ?? "http",
    host: process.env.SIGNALING_SERVER_HOST ?? "localhost",
    port: process.env.SIGNALING_SERVER_PORT ?? "3002",
  });

  return {
    logLevel: validateLogLevel(process.env.LOG_LEVEL) ?? "info",
    backendUrl,
    signalingServerUrl,
    retro: {
      maxVoteCount: Number(process.env.RETRO_MAX_VOTE_COUNT) ?? 3,
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

function validateLogLevel(logLevel?: string): LogLevel | undefined {
  const validLogLevels: LogLevel[] = ["debug", "info", "warn", "error"];
  if (logLevel && !validLogLevels.some((level) => level === logLevel))
    throw Error(`Invalid log level '${logLevel}'. Allowed levels: ${validLogLevels}`);
  return logLevel as LogLevel;
}
