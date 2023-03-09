export interface ChartData {
  name: string;
  value: number;
}

export interface PokerUnit {
  unitType: PokerUnitType;
  unitRangeHigh: number;
}

export interface PokerStory {
  storyTitle: string;
  storyUrl?: string;
}

export type VoteByUserId = Record<string, number>;

export type PokerUnitType = "fibonacci" | "tshirt" | "naturalnumbers";
