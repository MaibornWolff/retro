import { SET_FOCUSED_CARD, REMOVE_FOCUSED_CARD } from "../actionTypes/boardTypes";

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_FOCUSED_CARD:
      return {
        focusedCard: action.payload.focusedCard
      };
    case REMOVE_FOCUSED_CARD:
      return {
        focusedCard: ""
      };
    default:
      return state;
  }
};
