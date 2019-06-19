import React, { useReducer } from "react";
import io from "socket.io-client";

import { BACKEND_ENDPOINT } from "../utils";
import { SET_FOCUSED_CARD, REMOVE_FOCUSED_CARD } from "../actions/actionTypes";

export const BoardContext = React.createContext();

// TODO: move board state here
// TODO: move socket logic here
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

let socket;

export const BoardContextProvider = props => {
  const boardId = props.match.params.boardId;
  const [boardState, boardDispatch] = useReducer(reducer, initialState);

  if (!socket) {
    socket = io(BACKEND_ENDPOINT, { query: "boardId=" + boardId });
  }

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
