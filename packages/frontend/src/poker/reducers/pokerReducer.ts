import { PokerState } from "../types/pokerTypes";
import { PokerAction } from "../types/pokerActions";
import {
  findModerator,
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
      const { [id]: removedUser, ...remainingWaitingList } = state.waitingList;
      const newParticipant: User = { ...initialUserState, name, id, role };
      return {
        ...state,
        participants: { ...state.participants, [id]: newParticipant },
        waitingList: remainingWaitingList,
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
        ...initialUserState,
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
      const remainingParticipants = hasRemainingModerator(participants, disconnectedUserId)
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
