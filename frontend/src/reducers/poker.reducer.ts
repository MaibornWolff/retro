import {
  CREATE_POKER_ROLE,
  SET_NAME,
  SET_VOTE,
  SET_VOTED,
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
      };
    case SET_VOTED:
      return {
        ...state,
        voted: action.payload?.voted as boolean,
      };
    default:
      return state;
  }
};
