import { JOIN_BOARD, CONNECT } from "./event-names";
import { onCreateBoard, onUpdateBoard, onJoinBoard } from "./board-events";

export const onConnect = component => {
  component.socket.on(CONNECT, () => {
    component.socket.emit(JOIN_BOARD, component.props.boardId);
  });
};

export const onBoardEvents = component => {
  onCreateBoard(component);
  onUpdateBoard(component);
  onJoinBoard(component);
};
