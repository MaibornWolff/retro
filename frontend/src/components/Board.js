import React from "react";
import io from "socket.io-client";
import pull from "lodash/pull";
import { Grid, withStyles } from "@material-ui/core";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import BoardHeader from "./BoardHeader";
import Columns from "./Columns";
import { FlexContainer } from "./styled";
import { LOCAL_BACKEND_ENDPOINT } from "../utils";
import { UPDATE_BOARD } from "../events/event-names";
import { emptyBoard } from "../utils/emptyBoard";
import {
  onConnect,
  onCreateBoard,
  onUpdateBoard,
  onJoinBoard,
  onExportBoard
} from "../events/event-listener";

class Board extends React.Component {
  state = { ...emptyBoard };

  socket = io(LOCAL_BACKEND_ENDPOINT);

  componentDidMount() {
    onConnect(this);
    onCreateBoard(this);
    onUpdateBoard(this);
    onJoinBoard(this);
    onExportBoard(this);
  }

  onDragEnd = dragResult => {
    const { source, destination, type, combine } = dragResult;
    const { columns, columnOrder, items } = this.state;

    if (combine) {
      this.handleCombine(items, columns, dragResult);
      return;
    }

    if (!destination) {
      return;
    }

    if (this.isSamePosition(source, destination)) {
      return;
    }

    if (type === "column") {
      this.handleColumnDrag(dragResult, columnOrder);
      return;
    }

    if (this.isSameColumn(columns, source, destination)) {
      this.handleInsideColumnDrag(dragResult, columns);
      return;
    }

    this.handleNormalDrag(dragResult, columns);
  };

  handleCombine(items, columns, dragResult) {
    const { combine, draggableId, source } = dragResult;

    // get all related objects of the context of combine
    const itemToCombine = items[combine.draggableId];
    const itemToCombineWith = items[draggableId];
    const itemToCombineWithColumn = columns[source.droppableId];

    // extract the item content
    const originalContent = itemToCombine.content;
    const contentToMerge = itemToCombineWith.content;

    // combine the content
    const newContent = `${originalContent} === ${contentToMerge}`;
    itemToCombine.content = newContent;

    // remove the merged item
    const newItemIds = pull(
      itemToCombineWithColumn.itemIds,
      itemToCombineWith.id
    );

    // update state
    const newColumn = {
      ...itemToCombineWithColumn,
      itemIds: newItemIds
    };

    const newState = {
      ...this.state,
      columns: {
        ...columns,
        [newColumn.id]: newColumn
      }
    };

    this.setState(newState);
    this.socket.emit(UPDATE_BOARD, newState, this.props.boardId);
  }

  handleColumnDrag(dragResult, columnOrder) {
    const { source, destination, draggableId } = dragResult;
    const newColumnOrder = Array.from(columnOrder);

    newColumnOrder.splice(source.index, 1);
    newColumnOrder.splice(destination.index, 0, draggableId);

    const newState = {
      ...this.state,
      columnOrder: newColumnOrder
    };

    this.setState(newState);
    this.socket.emit(UPDATE_BOARD, newState, this.props.boardId);
  }

  handleInsideColumnDrag(dragResult, columns) {
    const { source, destination, draggableId } = dragResult;

    const startColumn = columns[source.droppableId];
    const newItemIds = Array.from(startColumn.itemIds);

    newItemIds.splice(source.index, 1);
    newItemIds.splice(destination.index, 0, draggableId);

    const newCol = { ...startColumn, itemIds: newItemIds };
    const newState = {
      ...this.state,
      columns: {
        ...columns,
        [newCol.id]: newCol
      }
    };

    this.setState(newState);
    this.socket.emit(UPDATE_BOARD, newState, this.props.boardId);
  }

  handleNormalDrag(dragResult, columns) {
    const { source, destination, draggableId } = dragResult;

    const startColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];

    const startItems = Array.from(startColumn.itemIds);
    const destinationItems = Array.from(destinationColumn.itemIds);

    startItems.splice(source.index, 1);
    destinationItems.splice(destination.index, 0, draggableId);

    const newStartColumn = {
      ...startColumn,
      itemIds: startItems
    };

    const newDestinationColumn = {
      ...destinationColumn,
      itemIds: destinationItems
    };

    const newState = {
      ...this.state,
      columns: {
        ...columns,
        [newStartColumn.id]: newStartColumn,
        [newDestinationColumn.id]: newDestinationColumn
      }
    };

    this.setState(newState);
    this.socket.emit(UPDATE_BOARD, newState, this.props.boardId);
  }

  isSamePosition(source, destination) {
    return (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    );
  }

  isSameColumn(columns, source, destination) {
    return columns[source.droppableId] === columns[destination.droppableId];
  }

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
    const { classes, boardId } = this.props;

    return (
      <Grid container className={classes.root} direction="column">
        <Grid item xs={12}>
          <Grid container className={classes.header} direction="row">
            <BoardHeader title={title} boardId={boardId} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable
              droppableId="allColumns"
              direction="horizontal"
              type="column"
            >
              {provided => (
                <FlexContainer
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {this.renderBoard(columns, items, boardId)}
                  {provided.placeholder}
                </FlexContainer>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>
      </Grid>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  header: {
    padding: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(Board);
