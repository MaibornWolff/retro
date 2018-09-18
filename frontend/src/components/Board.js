import React from "react";
import io from "socket.io-client";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { FlexContainer, Greeting } from "../styles/styledComponents";
import emptyBoard from "../utils/boards/emptyBoard";
import Header from "./Header";
import Columns from "./Columns";
import { LOCAL_BACKEND_ENDPOINT, BOARD_UPDATE } from "../utils/constants";
import {
  onCreateCard,
  onDeleteCard,
  onEditCard,
  onUpvoteCard,
  onCreateColumn,
  onDeleteColumn,
  onSortColumn,
  onCreateBoard,
  onUpdateBoard
} from "../utils/socketListener";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io(LOCAL_BACKEND_ENDPOINT);
    this.state = {
      ...emptyBoard,
      boardEmpty: true
    };
  }

  componentDidMount() {
    onCreateCard(this);
    onDeleteCard(this);
    onEditCard(this);
    onUpvoteCard(this);
    onCreateColumn(this);
    onDeleteColumn(this);
    onSortColumn(this);
    onCreateBoard(this);
    onUpdateBoard(this);
  }

  onDragEnd = dragResult => {
    const { draggableId, source, destination, type } = dragResult;
    const { columns, columnOrder } = this.state;

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
      this.socket.emit(BOARD_UPDATE, newState);
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    // column is the same
    if (start === finish) {
      const newItemIds = Array.from(start.itemIds);
      newItemIds.splice(source.index, 1);
      newItemIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...start, itemIds: newItemIds };
      const newState = {
        ...this.state,
        columns: {
          ...columns,
          [newColumn.id]: newColumn
        }
      };

      this.setState(newState);
      this.socket.emit(BOARD_UPDATE, newState);
      return;
    }

    // moving from one column to another one
    const startItemIds = Array.from(start.itemIds);
    startItemIds.splice(source.index, 1);
    const newStart = {
      ...start,
      itemIds: startItemIds
    };

    const finishItemIds = Array.from(finish.itemIds);
    finishItemIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      itemIds: finishItemIds
    };

    const newState = {
      ...this.state,
      columns: {
        ...columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };

    this.setState(newState);
    this.socket.emit(BOARD_UPDATE, newState);
  };

  renderGreeting() {
    return <Greeting>Welcome to Retro!</Greeting>;
  }

  renderBoard(columns, items) {
    return this.state.columnOrder.map((columnId, index) => {
      const column = columns[columnId];
      return (
        <Columns
          key={column.id}
          column={column}
          itemMap={items}
          index={index}
        />
      );
    });
  }

  render() {
    const { columns, items, title, boardEmpty } = this.state;

    return (
      <div>
        <Header title={title} boardEmpty={boardEmpty} />
        {boardEmpty ? this.renderGreeting() : null}
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
                {this.renderBoard(columns, items)}
                {provided.placeholder}
              </FlexContainer>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}
