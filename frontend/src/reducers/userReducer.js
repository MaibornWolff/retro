import { removeFirstOccurenceFromArray } from "../utils";
import {
  UPVOTE,
  DOWNVOTE,
  SET_MAX_VOTE,
  RESET,
  SET_NAME,
  CREATE_MODERATOR,
  CREATE_PARTICIPANT,
} from "../actionTypes/userTypes";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPVOTE:
      return {
        ...state,
        votesLeft: state.votesLeft - 1,
        votedItems: [...state.votedItems, action.payload.cardId],
      };
    case DOWNVOTE:
      return {
        ...state,
        votesLeft: state.votesLeft + 1,
        votedItems: removeFirstOccurenceFromArray(state.votedItems, action.payload.cardId, true),
      };
    case SET_MAX_VOTE:
      return {
        ...state,
        maxVoteCount: action.payload.maxVoteCount,
        votesLeft: action.payload.maxVoteCount,
        votedItems: [],
      };
    case RESET:
      return {
        ...state,
        votesLeft: state.maxVoteCount,
        votedItems: [],
      };
    case SET_NAME:
      return {
        ...state,
        name: action.payload.name,
      };
    case CREATE_MODERATOR:
      return {
        role: action.payload.role,
        name: "",
        maxVoteCount: action.payload.maxVoteCount,
        votesLeft: action.payload.maxVoteCount,
        votedItems: [],
      };
    case CREATE_PARTICIPANT:
      return {
        role: action.payload.role,
        name: "",
        maxVoteCount: action.payload.maxVoteCount,
        votesLeft: action.payload.maxVoteCount,
        votedItems: [],
      };
    default:
      return state;
  }
};
