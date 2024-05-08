import { createSlice } from "@reduxjs/toolkit";
import { RetroColumn, RetroState, TimerStatus } from "../types/retroTypes";
import { replace, sumVotes } from "../utils/retroUtils";
import { retroFormatConfig } from "../config/formatConfig";
import { generateId } from "../../common/utils/generateId";
import {
  findModerator,
  getRemainingParticipants,
  getRemainingParticipantsWithNewModerator,
} from "../../common/utils/participantsUtils";
import { User } from "../../common/types/commonTypes";

const initialState: RetroState = {
  title: "",
  format: "",
  columns: [],
  isBlurred: false,
  maxVoteCount: 0,
  participants: {},
  waitingList: {},
  isVotingEnabled: false,
  cardVotingLimit: 1,
  timerStatus: TimerStatus.STOPPED,
  timerDuration: 0,
};

const initialParticipant: User = {
  id: "",
  role: "participant",
  name: "",
};

const retroSlice = createSlice({
  name: "retro",
  initialState,
  reducers: {
    retroStateSet(state, action) {
      state = { ...action.payload, participants: state.participants };
    },
    stateInitialized(state, action) {
      state = {
        ...action.payload,
        participants: { ...state.participants, ...action.payload.participants },
      };
    },
    maxVotesChanged(state, action) {
      state.maxVoteCount = action.payload;
    },
    cardsSorted(state, action) {
      const column = state.columns[action.payload];
      if (!column) return state;
      const sortedColumn: RetroColumn = {
        ...column,
        cards: column.cards.sort((a, b) => sumVotes(b) - sumVotes(a)),
      };
      state.columns = replace(state.columns, action.payload, sortedColumn);
    },
    retroBlurToggled(state, action) {
      state.columns.map((column) => {
        return { ...column, isBlurred: !column.isBlurred };
      });
      state.isBlurred = !state.isBlurred;
    },
    retroFormatChanged(state, action) {
      const retroFormat = retroFormatConfig[action.payload];
      if (!retroFormat) return state;
      state.format = action.payload;
      state.columns = retroFormat.columnTitles.map((columnTitle, index) => {
        return { id: generateId(), index, columnTitle, cards: [], isBlurred: false };
      });
    },
    sessionJoined(state, action) {
      const { name, id, role } = action.payload;
      state.participants[id] = { ...initialParticipant, name, id, role };
      state.waitingList = getRemainingParticipants(state.waitingList, id);
    },
    moderatorRoleTransferred(state, action) {
      const user = state.participants[action.payload];
      const currentModerator = findModerator(state.participants);
      if (!user || !currentModerator) return state;
      state.participants[action.payload] = { ...user, role: "moderator" };
      state.participants[currentModerator.id] = { ...currentModerator, role: "participant" };
    },
    addedToWaitingList(state, action) {
      const { userId, name } = action.payload;
      state.waitingList[userId] = { ...initialParticipant, id: userId, name: name };
    },
    removedFromWaitingList(state, action) {
      state.waitingList = getRemainingParticipants(state.waitingList, action.payload.userId);
    },
    isVotingEnabledChanged(state, action) {
      state.isVotingEnabled = action.payload.isEnabled;
    },
    cardVotingLimitChanged(state, action) {
      state.cardVotingLimit = action.payload.limit;
    },
    timerStarted(state, action) {
      state.timerDuration = action.payload.duration;
      state.timerStatus = TimerStatus.RUNNING;
    },
    timerStopped(state, action) {
      state.timerDuration = 0;
      state.timerStatus = TimerStatus.STOPPED;
    },
    timerPaused(state, action) {
      state.timerStatus = TimerStatus.PAUSED;
    },
    timerChanged(state, action) {
      state.timerDuration = action.payload.duration;
    },
    userDisconnected(state, action) {
      const { participants, waitingList } = state;
      const disconnectedUserId = action.payload.id;
      const hasRemainingModerator = Object.values(participants).some(
        ({ id, role }) => disconnectedUserId !== id && role === "moderator",
      );
      state.participants = hasRemainingModerator
        ? getRemainingParticipants(participants, disconnectedUserId)
        : getRemainingParticipantsWithNewModerator(participants, disconnectedUserId);
      state.waitingList = getRemainingParticipants(waitingList, disconnectedUserId);
    },
    cardHighlighted(state, action) {
      const column = state.columns[action.payload.columnIndex];
      const card = column?.cards[action.payload.cardIndex];
      state.highlightedCardId = card?.id;
    },
    cardUnhighlighted(state, action) {
      state.highlightedCardId = undefined;
    },
  },
});
