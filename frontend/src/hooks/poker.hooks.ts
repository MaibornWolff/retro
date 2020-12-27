import create from "zustand";
import { POKER_UNIT_FIBONACCI } from "../constants/poker.constants";
import { Poker, PokerChartData } from "../types/common.types";

type PokerState = {
  pokerId: string;
  story: PokerStory;
  pokerUnit: PokerUnit;
  error: boolean;
  participants: PokerUser[];
  chartData: PokerChartData;
  setPokerState: (newPokerState: Poker) => void;
  setPokerError: () => void;
};

type PokerUnit = {
  unitType: string;
  unitRangeHigh: number;
};

export type PokerUser = {
  id: string;
  role: string;
  name: string;
  vote: number;
  voted: false;
};

type PokerStory = {
  storyTitle: string;
  storyUrl?: string;
};

export const usePokerStore = create<PokerState>((set) => ({
  pokerId: "",
  story: {
    storyTitle: "",
    storyUrl: "",
  },
  pokerUnit: {
    unitType: POKER_UNIT_FIBONACCI,
    unitRangeHigh: 34,
  },
  participants: [],
  error: false,
  chartData: {
    data: [],
  },
  setPokerState: (newPokerState) => set(() => ({ ...newPokerState })),
  setPokerError: () => set((state) => ({ ...state, error: true })),
}));
