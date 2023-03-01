import { PokerParticipant, PokerParticipantByUserId, PokerState } from "../types/pokerTypes";
import { resetAllVotes } from "../utils/pokerUtils";
import { PokerAction } from "../types/pokerActions";
import {
  findModerator,
  getRemainingParticipants,
  getRemainingParticipantsWithNewModerator,
  hasRemainingModerator,
} from "../../common/utils/participantsUtils";
import { User } from "../../common/types/commonTypes";

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
        participants: resetAllVotes(state.participants),
      };
    case "RESET_USER_STORY":
      return {
        ...state,
        showResults: false,
        participants: resetAllVotes(state.participants),
      };
    case "SET_POKER_UNIT":
      return {
        ...state,
        pokerUnit: action.payload,
      };
    case "JOIN_SESSION": {
      const { name, id, role } = action.payload;
      const { [id]: removedUser, ...remainingWaitingList } = state.waitingList;
      const newParticipant: PokerParticipant = { ...initialParticipant, name, id, role };
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
        participants: {
          ...state.participants,
          [user.id]: { ...user, voted: true, vote: action.payload.vote },
        },
      };
    }
    case "TRANSFER_MODERATOR_ROLE": {
      const user = state.participants[action.payload];
      const currentModerator = findModerator(state.participants);
      if (!user || !currentModerator) return state;
      const participants: PokerParticipantByUserId = {
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

const initialParticipant: PokerParticipant = {
  id: "",
  role: "participant",
  name: "",
  vote: -1,
  voted: false,
};
