import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserByUserId } from "../retro/types/retroTypes";
import { PokerStory, PokerUnit, VoteByUserId } from "./types/pokerTypes";
import { User } from "../common/types/commonTypes";
import { initialUserState } from "../common/context/UserContext";
import {
  findModerator,
  getRemainingParticipants,
  getRemainingParticipantsWithNewModerator,
  hasRemainingModerator,
} from "../common/utils/participantsUtils";

export interface PokerState {
  story: PokerStory;
  pokerUnit: PokerUnit;
  participants: UserByUserId;
  showResults: boolean;
  waitingList: UserByUserId;
  votes: VoteByUserId;
}

export const initialPokerState: PokerState = {
  story: {
    storyTitle: "",
    storyUrl: "",
  },
  pokerUnit: {
    unitType: "fibonacci",
    unitRangeHigh: 34,
  },
  participants: {},
  showResults: false,
  waitingList: {},
  votes: {},
};

export const pokerSlice = createSlice({
  name: "poker",
  initialState: initialPokerState,
  reducers: {
    showPokerResults: (state) => {
      state.showResults = true;
    },
    initializeState: (state, action: PayloadAction<PokerState>) => {
      const participants = { ...state.participants, ...action.payload.participants };
      state = action.payload;
      state.participants = participants;
    },
    setUserStory: (state, action: PayloadAction<PokerStory>) => {
      state.showResults = false;
      state.story = action.payload;
      state.votes = {};
    },
    resetUserStory: (state) => {
      state.showResults = false;
      state.votes = {};
    },
    setPokerUnit: (state, action: PayloadAction<PokerUnit>) => {
      state.pokerUnit = action.payload;
    },
    joinSession: (state, action: PayloadAction<User>) => {
      const { name, id, role } = action.payload;
      const { [id]: removedUser, ...remainingWaitingList } = state.waitingList;
      const newParticipant: User = { ...initialUserState, name, id, role };
      state.waitingList = remainingWaitingList;
      state.participants[id] = newParticipant;
    },
    sendVote: (state, action: PayloadAction<{ userId: string; vote: number }>) => {
      const user = state.participants[action.payload.userId];
      if (!user) return state;

      state.votes[user.id] = action.payload.vote;
    },
    transferModeratorRole: (state, action: PayloadAction<string>) => {
      const user = state.participants[action.payload];
      const currentModerator = findModerator(state.participants);
      if (!user || !currentModerator) return state;
      state.participants[user.id] = { ...user, role: "moderator" };
      state.participants[currentModerator.id] = { ...user, role: "participant" };
    },
    addToWaitingList: (state, action: PayloadAction<{ userId: string; userName: string }>) => {
      const waitingUser: User = {
        ...initialUserState,
        id: action.payload.userId,
        name: action.payload.userName,
      };
      state.waitingList[waitingUser.id] = waitingUser;
    },
    removeFromWaitingList: (state, action: PayloadAction<string>) => {
      const { [action.payload]: removedUser, ...remainingUsers } = state.waitingList;
      state.waitingList = remainingUsers;
    },
    disconnect: (state, action: PayloadAction<string>) => {
      const { participants, waitingList } = state;
      const disconnectedUserId = action.payload;
      const remainingParticipants = hasRemainingModerator(participants, disconnectedUserId)
        ? getRemainingParticipants(participants, disconnectedUserId)
        : getRemainingParticipantsWithNewModerator(participants, disconnectedUserId);

      const { [disconnectedUserId]: removedUser, ...remainingWaitingUsers } = waitingList;

      state.participants = remainingParticipants;
      state.waitingList = remainingWaitingUsers;
    },
  },
});

export const {
  showPokerResults,
  initializeState,
  setUserStory,
  resetUserStory,
  setPokerUnit,
  joinSession,
  sendVote,
  transferModeratorRole,
  addToWaitingList,
  removeFromWaitingList,
  disconnect,
} = pokerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPoker = (state: RootState) => state.poker;

export default pokerSlice.reducer;
