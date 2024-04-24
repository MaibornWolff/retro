import { RetroAppUrl } from "./RetroAppUrl";

export type CorsOrigins = string | string[];

export type LogLevel = "info" | "warn" | "error" | "debug";

export interface ApplicationConfiguration {
  logLevel: LogLevel;
  backendUrl: RetroAppUrl;
  signalingServerUrl: RetroAppUrl;
  corsOrigins: CorsOrigins;
  iceServerUrls: IceServerConfiguration[];
}

export interface IceServerConfiguration {
  url: string;
  credential?: string;
  username?: string;
}
