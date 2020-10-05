import create from "zustand";
import { POKER_UNIT_FIBONACCI } from "../constants/poker.constants";
import { Poker } from "../types/common.types";

type PokerState = {
  pokerId: string;
  story: PokerStory;
  pokerUnit: PokerUnit;
  error: boolean;
  participants: PokerUser[];
  setPokerState: (newPokerState: Poker) => void;
  setPokerError: () => void;
};

// TODO: remove low edge since this will be always 0
type PokerUnit = {
  unitType: string;
  unitRangeLow: number;
  unitRangeHigh: number;
};

type PokerUser = {
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
    unitRangeLow: 0,
    unitRangeHigh: 34,
  },
  participants: [],
  error: false,
  setPokerState: (newPokerState) => set(() => ({ ...newPokerState })),
  setPokerError: () => set((state) => ({ ...state, error: true })),
}));
