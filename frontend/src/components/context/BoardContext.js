import React from "react";

export const BoardContext = React.createContext();

export const BoardContextProvider = props => {
  const boardId = props.match.params.boardId;

  return (
    <BoardContext.Provider value={boardId}>
      {props.children}
    </BoardContext.Provider>
  );
};

/*
import React from "react";

import { connectSocket } from "../../utils";

export const BoardContext = React.createContext();

let socket;

function sendEvent(eventName, values) {
  socket.emit(eventName, ...values);
}

export const BoardContextProvider = props => {
  const boardId = props.match.params.boardId;

  if (!socket) {
    socket = connectSocket(boardId);
  }

  return (
    <BoardContext.Provider value={{ boardId, sendEvent }}>
      {props.children}
    </BoardContext.Provider>
  );
};
*/
