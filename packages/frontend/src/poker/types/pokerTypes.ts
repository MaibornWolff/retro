import { UserByUserId } from "../../retro/types/retroTypes";

export interface PokerState {
  story: PokerStory;
  pokerUnit: PokerUnit;
  participants: UserByUserId;
  showResults: boolean;
  waitingList: UserByUserId;
  votes: VoteByUserId;
}

export interface PokerUnit {
  unitType: PokerUnitType;
  unitRangeHigh: number;
}

export interface PokerStory {
  storyTitle: string;
  storyUrl?: string;
}

export interface ChartData {
  name: string;
  value: number;
}

export type VoteByUserId = Record<string, number>;

export type PokerUnitType = "fibonacci" | "tshirt" | "naturalnumbers";
