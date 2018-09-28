import { CREATE_BOARD, UPDATE_BOARD, JOIN_BOARD } from "./event-names";

export const onCreateBoard = component => {
  component.socket.on(CREATE_BOARD, newBoard => {
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
