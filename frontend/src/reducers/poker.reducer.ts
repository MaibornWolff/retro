import {
  CREATE_POKER_ROLE,
  SET_NAME,
  SET_VOTE,
  RESET_VOTES,
} from "../actions/poker.actions";
import { PokerUserState, PokerAction } from "../types/context.types";

export const reducer = (
  state: PokerUserState,
  action: PokerAction
): PokerUserState => {
  switch (action.type) {
    case CREATE_POKER_ROLE:
      return {
        ...state,
        id: action.payload?.id as string,
        role: action.payload?.role as string,
      };
    case SET_NAME:
      return {
        ...state,
        name: action.payload?.name as string,
      };
    case SET_VOTE:
      return {
        ...state,
        vote: action.payload?.vote as number,
        voted: true,
      };
    case RESET_VOTES:
      return {
        ...state,
        vote: -1,
        voted: false,
      };
    default:
      return state;
  }
};
