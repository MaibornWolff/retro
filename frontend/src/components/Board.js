import React from "react";
import _ from "lodash";
import socketIO from "socket.io-client";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { FlexContainer, Greeting } from "../styles/styledComponents";
import emptyBoard from "../utils/boards/emptyBoard";
import Header from "./Header";
import Columns from "./Columns";
import {
  LOCAL_BACKEND_ENDPOINT,
  CREATE_CARD,
  CREATE_COLUMN,
  DELETE_COLUMN,
  BOARD_UPDATE,
  UPVOTE_CARD,
  EDIT_CARD,
  SORT_COLUMN,
  DELETE_CARD,
  CREATE_BOARD
} from "../utils/constants";

export default class Board extends React.Component {
  state = {
    ...emptyBoard,
    itemsCount: _.size(emptyBoard.items),
    columnsCount: _.size(emptyBoard.columns),
    boardEmpty: true
  };

  componentDidMount() {
    const socket = socketIO(LOCAL_BACKEND_ENDPOINT);
    const { items, columns, columnOrder } = this.state;

    socket.on(CREATE_CARD, (card, columnId) => {
      items[card.id] = card;
      columns[columnId].itemIds.push(card.id);

      this.setState({
        items,
        columns,
        itemsCount: _.size(items)
      });
    });

    socket.on(CREATE_COLUMN, column => {
      const cols = { ...this.state.columns };
      const colOrder = Array.from(this.state.columnOrder);

      cols[column.id] = column;
      colOrder.push(column.id);

      this.setState({
        columns: cols,
        columnOrder: colOrder,
        columnsCount: _.size(cols),
        boardEmpty: false
      });
    });

    socket.on(DELETE_COLUMN, columnId => {
      // remove items for the removed column
      const itemIdsToRemove = columns[columnId].itemIds;
      itemIdsToRemove.forEach(id => _.unset(items, id));

      // remove column itself
      _.pull(columnOrder, columnId);
      _.unset(columns, columnId);

      this.setState({
        items,
        columns,
        columnOrder,
        itemsCount: _.size(items),
        columnsCount: _.size(columns)
      });
    });

    socket.on(BOARD_UPDATE, newBoard => {
      this.setState({ ...newBoard });
    });

    socket.on(UPVOTE_CARD, cardId => {
      items[cardId].points += 1;

      this.setState({ items });
    });

    socket.on(EDIT_CARD, (cardAuthor, cardContent, cardId) => {
      const card = items[cardId];
      card.author = cardAuthor;
      card.content = cardContent;

      this.setState({ items });
    });

    socket.on(SORT_COLUMN, (colId, colItems) => {
      let sortedItemIds = [];

      const sortedItems = _.orderBy(colItems, "points", "desc");
      sortedItems.forEach(item => sortedItemIds.push(item.id));

      columns[colId].itemIds = sortedItemIds;
      this.setState({ columns });

      sortedItemIds = [];
    });

    socket.on(DELETE_CARD, cardId => {
      _.unset(items, cardId);
      _.forIn(columns, col => _.remove(col.itemIds, id => id === cardId));

      this.setState({
        items,
        columns,
        itemsCount: _.size(items)
      });
    });

    socket.on(CREATE_BOARD, newBoard => {
      this.setState({
        ...newBoard,
        itemsCount: 0,
        columnsCount: 0,
        boardEmpty: false
      });
    });
  }

  onDragEnd = dragResult => {
    const socket = socketIO(LOCAL_BACKEND_ENDPOINT);
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
      socket.emit(BOARD_UPDATE, newState);
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
      socket.emit(BOARD_UPDATE, newState);
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
    socket.emit(BOARD_UPDATE, newState);
  };

  renderGreeting() {
    return (
      <Greeting>
        Welcome to Retro! To start your retrospective click the
        {" "}
        <q>New Board</q>
        button above!
      </Greeting>
    );
  }

  renderBoard(columns, items, itemsCount) {
    return this.state.columnOrder.map((columnId, index) => {
      const column = columns[columnId];
      return (
        <Columns
          key={column.id}
          column={column}
          itemMap={items}
          index={index}
          itemsCount={itemsCount}
        />
      );
    });
  }

  render() {
    const {
      columns,
      items,
      title,
      itemsCount,
      columnsCount,
      boardEmpty
    } = this.state;

    return (
      <div>
        <Header title={title} columnsCount={columnsCount} boardEmpty={boardEmpty} />
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
                {this.renderBoard(columns, items, itemsCount)}
                {provided.placeholder}
              </FlexContainer>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}
