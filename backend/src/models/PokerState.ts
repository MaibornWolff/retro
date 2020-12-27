export type PokerState = {
  pokerId: string;
  story: PokerStory;
  pokerUnit: PokerUnit;
  error: boolean;
  participants: PokerParticipant[];
  chartData: PokerChartData;
};

export type PokerUnit = {
  unitType: string;
  unitRangeHigh: number;
};

export type PokerStory = {
  storyTitle: string;
  storyUrl?: string;
};

export type PokerParticipant = {
  id: string;
  role: string;
  name: string;
  vote: number;
  voted: boolean;
};

export type PokerChartData = {
  data: ChartData[];
};

export type ChartData = {
  name: string;
  value: number;
};
