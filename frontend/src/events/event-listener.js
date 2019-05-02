import {
  CONNECT,
  CREATE_BOARD,
  UPDATE_BOARD,
  JOIN_BOARD,
  JOIN_ERROR
} from "./event-names";

export const onConnect = component => {
  component.socket.on(CONNECT, () => {
    const boardId = component.props.match.params.boardId;
    component.socket.emit(JOIN_BOARD, boardId);
  });
};

export const onCreateBoard = component => {
  component.socket.on(CREATE_BOARD, newBoard => {
    localStorage.setItem(
      newBoard.boardId,
      JSON.stringify({ role: "moderator", name: "" })
    );
    component.setState({
      ...newBoard
    });
  });
};

export const onUpdateBoard = component => {
  component.socket.on(UPDATE_BOARD, newBoard => {
    component.setState({ ...newBoard });
  });
};

export const onJoinBoard = component => {
  component.socket.on(JOIN_BOARD, board => {
    component.setState({ ...board });
  });
};

export const onJoinError = component => {
  component.socket.on(JOIN_ERROR, () => {
    component.setState({ error: true });
  });
};
