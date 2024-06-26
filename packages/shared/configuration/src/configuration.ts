import { ApplicationConfiguration, CorsOrigins, IceServerConfiguration, LogLevel } from "./types";
import { RetroAppUrl } from "./RetroAppUrl";

export function getConfiguration(): ApplicationConfiguration {
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
    corsOrigins: parseCorsOrigins(process.env.CORS_ORIGIN) ?? "*",
    iceServerUrls: parseIceServers(process.env.ICE_SERVER_URLS) ?? [
      { url: "stun:stun.l.google.com:19302" },
    ],
  };
}

function parseIceServers(urls?: string): IceServerConfiguration[] | undefined {
  if (urls?.trim().length === 0) return undefined;
  return urls?.split(",")?.map((url) => parseIceServer(url));
}

function parseIceServer(input: string) {
  const url = new URL(input.trim());

  return {
    url: url.protocol + url.host,
    credential: url.password ? decodeURIComponent(url.password) : undefined,
    username: url.username ? decodeURIComponent(url.username) : undefined,
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
