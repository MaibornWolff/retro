import React, { useReducer } from "react";
import io from "socket.io-client";

import {
  SET_FOCUSED_CARD,
  REMOVE_FOCUSED_CARD
} from "../../actions/actionTypes";
import { BACKEND_ENDPOINT } from "../../utils";

export const BoardContext = React.createContext();

const initialState = { focusedCard: "" };

function reducer(state, action) {
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
}

export const BoardContextProvider = props => {
  const boardId = props.match.params.boardId;
  const socket = io(BACKEND_ENDPOINT, { query: "boardId=" + boardId });
  const [boardState, boardDispatch] = useReducer(reducer, initialState);

  const value = {
    boardId,
    boardState,
    boardDispatch,
    socket
  };

  return (
    <BoardContext.Provider value={value}>
      {props.children}
    </BoardContext.Provider>
  );
};
