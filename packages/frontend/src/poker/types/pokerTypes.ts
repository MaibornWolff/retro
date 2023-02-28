import { User } from "../../common/types/commonTypes";

export interface PokerState {
  story: PokerStory;
  pokerUnit: PokerUnit;
  participants: PokerParticipantByUserId;
  showResults: boolean;
}

export interface PokerUnit {
  unitType: PokerUnitType;
  unitRangeHigh: number;
}

export interface PokerParticipant extends User {
  vote: number;
  voted: boolean;
}

export interface PokerStory {
  storyTitle: string;
  storyUrl?: string;
}

export interface ChartData {
  name: string;
  value: number;
}

export type PokerParticipantByUserId = Record<string, PokerParticipant>;

export type PokerUnitType = "fibonacci" | "tshirt" | "naturalnumbers";
