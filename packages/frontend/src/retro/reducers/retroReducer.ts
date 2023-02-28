import { RetroCard, RetroColumn, RetroState, UserByUserId } from "../types/retroTypes";
import { RetroAction } from "../types/retroActions";
import {
  insertCardIntoColumn,
  remove,
  removeCardFromColumn,
  replace,
  replaceCardContent,
  replaceCardInColumn,
  sumVotes,
} from "../utils/retroUtils";
import { retroFormatConfig } from "../config/formatConfig";
import { generateId } from "../../common/utils/generateId";
import { User } from "../../common/types/commonTypes";
import {
  findModerator,
  getRemainingParticipants,
  getRemainingParticipantsWithNewModerator,
} from "../../common/utils/participantsUtils";

export const retroReducer = (state: RetroState, action: RetroAction): RetroState => {
  switch (action.type) {
    case "SET_RETRO_STATE": {
      return { ...action.payload, participants: state.participants };
    }
    case "INITIALIZE_STATE": {
      return {
        ...action.payload,
        participants: { ...state.participants, ...action.payload.participants },
      };
    }
    case "CARD_UPVOTE": {
      const { columnIndex, cardIndex, userId } = action.payload;
      const column = state.columns[columnIndex];
      const card = column?.cards[cardIndex];
      if (!card) return state;
      const votes = { ...card.votes, [userId]: (card.votes[userId] ?? 0) + 1 };
      const updatedCard = { ...card, votes };
      const columns = replaceCardInColumn(state.columns, cardIndex, columnIndex, updatedCard);

      return { ...state, columns };
    }
    case "CARD_REMOVE_UPVOTE": {
      const { columnIndex, cardIndex, userId } = action.payload;
      const column = state.columns[columnIndex];
      const card = column?.cards[cardIndex];
      if (!card) return state;
      const votes = { ...card.votes, [userId]: (card.votes[userId] ?? 0) - 1 };
      const updatedCard = { ...card, votes };
      const columns = replaceCardInColumn(state.columns, cardIndex, columnIndex, updatedCard);

      return { ...state, columns };
    }
    case "MAX_VOTE_CHANGE":
      return {
        ...state,
        maxVoteCount: action.payload,
      };
    case "VOTE_RESET": {
      const columns = state.columns.map((column) => {
        const cards = column.cards.map((card) => {
          return { ...card, votes: {} };
        });
        return { ...column, cards };
      });
      return { ...state, columns };
    }
    case "CREATE_CARD":
      return {
        ...state,
        columns: insertCardIntoColumn(
          state.columns,
          action.payload.card,
          action.payload.columnIndex
        ),
      };
    case "DELETE_CARD": {
      const { cardIndex, columnIndex } = action.payload;

      return {
        ...state,
        columns: removeCardFromColumn(state.columns, cardIndex, columnIndex),
      };
    }
    case "EDIT_CARD":
      return {
        ...state,
        columns: replaceCardContent(
          state.columns,
          action.payload.cardIndex,
          action.payload.columnIndex,
          action.payload.cardContent
        ),
      };
    case "CREATE_COLUMN":
      return {
        ...state,
        columns: [...state.columns, action.payload],
      };
    case "DELETE_COLUMN":
      return {
        ...state,
        columns: remove(state.columns, action.payload).map((column, index) => {
          return { ...column, index };
        }),
      };
    case "EDIT_COLUMN": {
      const column = state.columns[action.payload.columnIndex];
      if (!column) return state;
      const updatedColumn: RetroColumn = {
        ...column,
        columnTitle: action.payload.title,
      };
      return {
        ...state,
        columns: replace(state.columns, action.payload.columnIndex, updatedColumn),
      };
    }
    case "TOGGLE_COLUMN_BLUR": {
      const column = state.columns[action.payload];
      if (!column) return state;
      const updatedColumn: RetroColumn = { ...column, isBlurred: !column.isBlurred };
      return {
        ...state,
        columns: replace(state.columns, action.payload, updatedColumn),
      };
    }
    case "TOGGLE_CARD_DISCUSSED": {
      const column = state.columns[action.payload.columnIndex];
      const card = column?.cards[action.payload.cardIndex];
      if (!card) return state;
      const updatedCard: RetroCard = { ...card, isDiscussed: !card.isDiscussed };
      return {
        ...state,
        columns: replaceCardInColumn(
          state.columns,
          action.payload.cardIndex,
          action.payload.columnIndex,
          updatedCard
        ),
      };
    }
    case "HIGHLIGHT_CARD": {
      const column = state.columns[action.payload.columnIndex];
      const card = column?.cards[action.payload.cardIndex];
      return {
        ...state,
        highlightedCardId: card?.id,
      };
    }
    case "UNHIGHLIGHT_CARD":
      return {
        ...state,
        highlightedCardId: undefined,
      };
    case "SORT_CARDS": {
      const column = state.columns[action.payload];
      if (!column) return state;
      const sortedColumn: RetroColumn = {
        ...column,
        cards: column.cards.sort((a, b) => sumVotes(b) - sumVotes(a)),
      };
      return {
        ...state,
        columns: replace(state.columns, action.payload, sortedColumn),
      };
    }
    case "TOGGLE_RETRO_BLUR":
      return {
        ...state,
        columns: state.columns.map((column) => {
          return { ...column, isBlurred: !column.isBlurred };
        }),
      };
    case "CHANGE_RETRO_FORMAT": {
      const retroFormat = retroFormatConfig[action.payload];
      if (!retroFormat) return state;
      const columns: RetroColumn[] = retroFormat.columnTitles.map((columnTitle, index) => {
        return { id: generateId(), index, columnTitle, cards: [], isBlurred: false };
      });
      return {
        ...state,
        format: action.payload,
        columns,
      };
    }
    case "JOIN_SESSION": {
      const { name, id, role } = action.payload;
      const { [id]: removedUser, ...remainingWaitingList } = state.waitingList;
      const newParticipant: User = { ...initialParticipant, name, id, role };
      return {
        ...state,
        participants: { ...state.participants, [id]: newParticipant },
        waitingList: remainingWaitingList,
      };
    }
    case "TRANSFER_MODERATOR_ROLE": {
      const user = state.participants[action.payload];
      const currentModerator = findModerator(state.participants);
      if (!user || !currentModerator) return state;
      const participants: UserByUserId = {
        ...state.participants,
        [action.payload]: { ...user, role: "moderator" },
        [currentModerator.id]: { ...currentModerator, role: "participant" },
      };
      return { ...state, participants };
    }
    case "ADD_TO_WAITING_LIST": {
      const waitingUser: User = {
        ...initialParticipant,
        id: action.payload.userId,
        name: action.payload.userName,
      };
      return { ...state, waitingList: { ...state.waitingList, [waitingUser.id]: waitingUser } };
    }
    case "REMOVE_FROM_WAITING_LIST": {
      const { [action.payload.userId]: removedUser, ...remainingUsers } = state.waitingList;
      return { ...state, waitingList: { ...remainingUsers } };
    }
    case "DISCONNECT": {
      const { participants, waitingList } = state;
      const disconnectedUserId = action.payload;
      const hasRemainingModerator = Object.values(participants).some(
        ({ id, role }) => disconnectedUserId !== id && role === "moderator"
      );

      const remainingParticipants = hasRemainingModerator
        ? getRemainingParticipants(participants, disconnectedUserId)
        : getRemainingParticipantsWithNewModerator(participants, disconnectedUserId);

      const { [disconnectedUserId]: removedUser, ...remainingWaitingUsers } = waitingList;

      return {
        ...state,
        participants: remainingParticipants,
        waitingList: remainingWaitingUsers,
      };
    }
    default:
      return state;
  }
};

const initialParticipant: User = {
  id: "",
  role: "participant",
  name: "",
};