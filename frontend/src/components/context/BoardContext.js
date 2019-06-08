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
