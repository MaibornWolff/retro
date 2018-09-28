import React from "react";
import io from "socket.io-client";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Header from "./Header";
import Columns from "./Columns";
import { FlexContainer } from "../styles/styledComponents";
import { LOCAL_BACKEND_ENDPOINT } from "../utils";
import { UPDATE_BOARD } from "../events/event-names";
import { emptyBoard } from "../utils/emptyBoard";
import {
  onConnect,
  onCreateBoard,
  onUpdateBoard,
  onJoinBoard
} from "../events/event-listener";

export default class Board extends React.Component {
  state = { ...emptyBoard };

  socket = io(LOCAL_BACKEND_ENDPOINT);

  componentDidMount() {
    onConnect(this);
    onCreateBoard(this);
    onUpdateBoard(this);
    onJoinBoard(this);
  }

  onDragEnd = dragResult => {
    const { draggableId, source, destination, type } = dragResult;
    const { columns, columnOrder } = this.state;
    const { boardId } = this.props;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        columnOrder: newColumnOrder
      };

      this.setState(newState);
      this.socket.emit(UPDATE_BOARD, newState, boardId);
      return;
    }

    const startColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];

    // column is the same
    if (startColumn === destinationColumn) {
      const newItemIds = Array.from(startColumn.itemIds);
      newItemIds.splice(source.index, 1);
      newItemIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...startColumn, itemIds: newItemIds };
      const newState = {
        ...this.state,
        columns: {
          ...columns,
          [newColumn.id]: newColumn
        }
      };

      this.setState(newState);
      this.socket.emit(UPDATE_BOARD, newState, boardId);
      return;
    }

    // moving from one column to another one
    const startItemIds = Array.from(startColumn.itemIds);
    startItemIds.splice(source.index, 1);
    const newStart = {
      ...startColumn,
      itemIds: startItemIds
    };

    const finishItemIds = Array.from(destinationColumn.itemIds);
    finishItemIds.splice(destination.index, 0, draggableId);
    const newDestination = {
      ...destinationColumn,
      itemIds: finishItemIds
    };

    const newState = {
      ...this.state,
      columns: {
        ...columns,
        [newStart.id]: newStart,
        [newDestination.id]: newDestination
      }
    };

    this.setState(newState);
    this.socket.emit(UPDATE_BOARD, newState, boardId);
  };

  renderBoard(columns, items, boardId) {
    return this.state.columnOrder.map((columnId, index) => {
      const column = columns[columnId];
      return (
        <Columns
          key={column.id}
          column={column}
          itemMap={items}
          index={index}
          boardId={boardId}
        />
      );
    });
  }

  render() {
    const { columns, items, title } = this.state;
    const { boardId } = this.props;

    return (
      <div>
        <Header title={title} boardId={boardId} />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable
            droppableId="allColumns"
            direction="horizontal"
            type="column"
          >
            {provided => (
              <FlexContainer
                {...provided.droppableProps}
                innerRef={provided.innerRef}
              >
                {this.renderBoard(columns, items, boardId)}
                {provided.placeholder}
              </FlexContainer>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}
