/* eslint-disable react/no-multi-comp */

import React from "react";
import _ from "lodash";
import socketIO from "socket.io-client";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import board from "../utils/seed";
import BoardColumn from "./BoardColumn";
import BoardHeader from "./BoardHeader";
import { LOCAL_BACKEND_ENDPOINT, CREATE_CARD_EVENT } from "../utils/constants";

const Container = styled.div`
  display: flex;
`;

class InnerList extends React.PureComponent {
  render() {
    const { column, itemMap, index, boardItemsCount } = this.props;
    const items = column.itemIds.map(id => itemMap[id]);
    return (
      <BoardColumn
        column={column}
        items={items}
        index={index}
        boardItemsCount={boardItemsCount}
      />
    );
  }
}

export default class Board extends React.Component {
  state = {
    ...board,
    boardItemsCount: _.size(board.items),
    boardColumnsCount: _.size(board.columns)
  };

  componentDidMount() {
    const socket = socketIO(LOCAL_BACKEND_ENDPOINT);
    const { items, columns } = this.state;

    socket.on(CREATE_CARD_EVENT, (card, columnId) => {
      items[card.id] = card;
      columns[columnId].itemIds.push(card.id);
      this.setState({
        items,
        columns,
        boardItemsCount: _.size(items),
        boardColumnsCount: _.size(columns)
      });
    });
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
  };

  render() {
    const { columns, items, title, boardItemsCount } = this.state;

    return (
      <div>
        <BoardHeader title={title} />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable
            droppableId="allColumns"
            direction="horizontal"
            type="column"
          >
            {provided => (
              <Container
                {...provided.droppableProps}
                innerRef={provided.innerRef}
              >
                {this.state.columnOrder.map((columnId, index) => {
                  const column = columns[columnId];
                  return (
                    <InnerList
                      key={column.id}
                      column={column}
                      itemMap={items}
                      index={index}
                      boardItemsCount={boardItemsCount}
                    />
                  );
                })}
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}
