import { RetroAppUrl } from "./RetroAppUrl";

export interface ApplicationConfiguration {
  logLevel: string;
  backendUrl: RetroAppUrl;
  retro: RetroConfiguration;
  signalingServerUrl: RetroAppUrl;
}

export interface RetroConfiguration {
  maxVoteCount: number;
}
