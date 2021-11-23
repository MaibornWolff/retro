import {
  CREATE_MODERATOR,
  CREATE_PARTICIPANT,
  DOWNVOTE,
  RESET,
  SET_MAX_VOTE,
  SET_NAME,
  UPVOTE,
  WROTE_COMMENT,
} from "../actions/user.actions";
import { UserAction, UserState } from "../types/context.types";
import { removeFirstOccurenceFromArray } from "../utils";

export const reducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case UPVOTE:
      return {
        ...state,
        votesLeft: state.votesLeft - 1,
        votedItems: [...state.votedItems, action.payload?.cardId] as string[],
      };
    case DOWNVOTE:
      return {
        ...state,
        votesLeft: state.votesLeft + 1,
        votedItems: removeFirstOccurenceFromArray(
          state.votedItems,
          action.payload?.cardId as string
        ),
      };
    case SET_MAX_VOTE:
      return {
        ...state,
        maxVoteCount: action.payload?.maxVoteCount as number,
        votesLeft: action.payload?.maxVoteCount as number,
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
        name: action.payload?.name as string,
      };
    case CREATE_MODERATOR:
      return {
        role: action.payload?.role as string,
        name: "",
        maxVoteCount: action.payload?.maxVoteCount as number,
        votesLeft: action.payload?.maxVoteCount as number,
        votedItems: [],
        writtenComments: [],
      };
    case CREATE_PARTICIPANT:
      return {
        role: action.payload?.role as string,
        name: "",
        maxVoteCount: action.payload?.maxVoteCount as number,
        votesLeft: action.payload?.maxVoteCount as number,
        votedItems: [],
        writtenComments: [],
      };
    case WROTE_COMMENT:
      return {
        ...state,
        writtenComments: state.writtenComments.concat(
          action.payload?.commentId as string
        ),
      };
    default:
      return state;
  }
};
