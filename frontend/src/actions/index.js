import { SET_FOCUSED_CARD, REMOVE_FOCUSED_CARD } from "./actionTypes";

// BOARD CONTEXT ACTIONS
export const setFocusedCard = (focusedCard, dispatch) => {
  dispatch({ type: SET_FOCUSED_CARD, payload: { focusedCard } });
};

export const removeFocusedCard = dispatch => {
  dispatch({ type: REMOVE_FOCUSED_CARD });
};
