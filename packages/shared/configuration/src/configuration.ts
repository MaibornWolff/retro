import { ApplicationConfiguration, CorsOrigins, IceServerConfiguration, LogLevel } from "./types";
import { RetroAppUrl } from "./RetroAppUrl";
import * as process from "process";
export const configuration = getConfiguration();

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
    retro: {
      maxVoteCount: Number(process.env.RETRO_MAX_VOTE_COUNT) ?? 3,
    },
    corsOrigins: parseCorsOrigins(process.env.CORS_ORIGIN) ?? "*",
    iceServerUrls: parseIceServers(process.env.ICE_SERVER_URLS) ?? [
      { url: "stun:stun.l.google.com:19302" },
    ],
  };
}

// ?? [{ url: "stun:stun.l.google.com:19302" }:IceServerConfiguration
function parseIceServers(list?: string): IceServerConfiguration[] | undefined {
  if (!list) return undefined;

  return list.split(",").map(function (val) {
    return parseIceServer(val);
  });
}

function parseIceServer(input: string) {
  const server: IceServerConfiguration = {
    url: input.trim(),
  };

  if (input.includes("@")) {
    const urlSplitPos = input.lastIndexOf("@");
    const [parsedParameter, parsedUrl] = splitOnPosition(input, urlSplitPos);

    if (parsedUrl) {
      server.url = parsedUrl.trim();

      if (parsedParameter?.includes(":")) {
        const credSplitPos = parsedParameter.indexOf(":");
        const [parsedUser, parsedCredential] = splitOnPosition(parsedParameter, credSplitPos);

        if (parsedUser) {
          server.username = parsedUser.trim();
        }
        if (parsedCredential) {
          server.credential = parsedCredential.trim();
        }
      } else if (parsedParameter) {
        server.username = parsedParameter.trim();
      }
    }
  }

  return server;
  /* return {
    url: url.trim(),
    username: username ? username.trim() : undefined,
    credential: credential ? credential.trim() : undefined,
  }; */
}

function splitOnPosition(value: string, position: number) {
  return [value.slice(0, position), value.slice(position + 1)];
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
