import { ApplicationState } from "../../common/types/commonTypes";

export interface PokerState extends ApplicationState {
  story: PokerStory;
  pokerUnit: PokerUnit;
  showResults: boolean;
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
