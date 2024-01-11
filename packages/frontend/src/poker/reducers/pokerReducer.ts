import { PokerState } from "../types/pokerTypes";
import { PokerAction } from "../types/pokerActions";
import {
  findModerators,
  getRemainingParticipants,
  getRemainingParticipantsWithNewModerator,
  hasRemainingModerator,
} from "../../common/utils/participantsUtils";
import { User } from "../../common/types/commonTypes";
import { initialUserState } from "../../common/context/UserContext";
import { UserByUserId } from "../../retro/types/retroTypes";

export const pokerReducer = (state: PokerState, action: PokerAction): PokerState => {
  switch (action.type) {
    case "SHOW_POKER_RESULTS":
      return {
        ...state,
        showResults: true,
      };
    case "INITIALIZE_STATE": {
      return {
        ...action.payload,
        participants: { ...state.participants, ...action.payload.participants },
      };
    }
    case "SET_USER_STORY":
      return {
        ...state,
        showResults: false,
        story: action.payload,
        votes: {},
      };
    case "RESET_USER_STORY":
      return {
        ...state,
        showResults: false,
        votes: {},
      };
    case "SET_POKER_UNIT":
      return {
        ...state,
        pokerUnit: action.payload,
      };
    case "JOIN_SESSION": {
      const { name, id, role } = action.payload;
      const remainingWaitingUsers = getRemainingParticipants(state.waitingList, id);
      const newParticipant: User = { ...initialUserState, name, id, role };
      return {
        ...state,
        participants: { ...state.participants, [id]: newParticipant },
        waitingList: remainingWaitingUsers,
      };
    }
    case "SEND_VOTE": {
      const user = state.participants[action.payload.userId];
      if (!user) return state;

      return {
        ...state,
        votes: {
          ...state.votes,
          [user.id]: action.payload.vote,
        },
      };
    }
    case "PROMOTE_TO_MODERATOR": {
      const user = state.participants[action.payload];
      const currentModerators = findModerators(state.participants);
      if (!user || !currentModerators.length) return state;
      const participants: UserByUserId = {
        ...state.participants,
        [action.payload]: { ...user, role: "moderator" },
      };
      return { ...state, participants };
    }
    case "ADD_TO_WAITING_LIST": {
      const waitingUser: User = {
        ...initialUserState,
        id: action.payload.userId,
        name: action.payload.userName,
      };
      return { ...state, waitingList: { ...state.waitingList, [waitingUser.id]: waitingUser } };
    }
    case "REMOVE_FROM_WAITING_LIST": {
      const remainingWaitingUsers = getRemainingParticipants(
        state.waitingList,
        action.payload.userId
      );
      return { ...state, waitingList: remainingWaitingUsers };
    }
    case "DISCONNECT": {
      const { participants, waitingList } = state;
      const disconnectedUserId = action.payload;
      const remainingParticipants = hasRemainingModerator(participants, disconnectedUserId)
        ? getRemainingParticipants(participants, disconnectedUserId)
        : getRemainingParticipantsWithNewModerator(participants, disconnectedUserId);

      const remainingWaitingUsers = getRemainingParticipants(waitingList, disconnectedUserId);

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
