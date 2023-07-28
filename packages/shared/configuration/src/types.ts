import { RetroAppUrl } from "./RetroAppUrl";

export interface ApplicationConfiguration {
  logLevel: string;
  backendUrl: RetroAppUrl;
  retro: RetroConfiguration;
  signalingServerUrl: RetroAppUrl;
  corsOrigins: string | string[];
}

export interface RetroConfiguration {
  maxVoteCount: number;
}
