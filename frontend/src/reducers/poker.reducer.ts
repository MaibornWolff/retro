import { SET_NAME, SET_VOTE, SET_VOTED } from "../actions/poker.actions";
import { PokerState, PokerAction } from "../types/context.types";

export const reducer = (state: PokerState, action: PokerAction): PokerState => {
  switch (action.type) {
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
