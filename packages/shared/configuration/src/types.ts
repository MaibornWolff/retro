import { RetroAppUrl } from "./RetroAppUrl";

export type CorsOrigins = string | string[];

export interface ApplicationConfiguration {
  logLevel: string;
  backendUrl: RetroAppUrl;
  retro: RetroConfiguration;
  signalingServerUrl: RetroAppUrl;
  corsOrigins: CorsOrigins;
}

export interface RetroConfiguration {
  maxVoteCount: number;
}
