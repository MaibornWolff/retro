import React, { useReducer } from "react";
import io from "socket.io-client";

import { reducer } from "../reducers/boardReducer";
import { BACKEND_ENDPOINT } from "../utils";
import {
  SET_FOCUSED_CARD,
  REMOVE_FOCUSED_CARD
} from "../actionTypes/boardTypes";

export const BoardContext = React.createContext();

const initialState = { focusedCard: "" };

let socket;

export const BoardContextProvider = props => {
  const boardId = props.match.params.boardId;
  const [boardState, dispatch] = useReducer(reducer, initialState);

  if (!socket) {
    socket = io(BACKEND_ENDPOINT, { query: "boardId=" + boardId });
  }

  const setFocusedCard = focusedCard => {
    dispatch({ type: SET_FOCUSED_CARD, payload: { focusedCard } });
  };

  const removeFocusedCard = () => {
    dispatch({ type: REMOVE_FOCUSED_CARD });
  };

  const value = {
    boardId,
    boardState,
    socket,
    setFocusedCard,
    removeFocusedCard
  };

  return (
    <BoardContext.Provider value={value}>
      {props.children}
    </BoardContext.Provider>
  );
};
