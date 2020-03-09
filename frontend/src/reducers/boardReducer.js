import {
  SET_FOCUSED_CARD,
  REMOVE_FOCUSED_CARD,
  SET_CONTINUE_DISCUSSION
} from "../actionTypes/boardTypes";

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_FOCUSED_CARD:
      return {
        ...state,
        focusedCard: action.payload.focusedCard
      };
    case REMOVE_FOCUSED_CARD:
      return {
        ...state,
        focusedCard: ""
      };
    case SET_CONTINUE_DISCUSSION:
      return {
        ...state,
        showContinueDiscussion: !state.showContinueDiscussion
      };
    default:
      return state;
  }
};
