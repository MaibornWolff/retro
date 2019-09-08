import React, { useState, useEffect, useContext } from "react";
import pull from "lodash/pull";
import isEqual from "lodash/isEqual";
import { Grid, withStyles } from "@material-ui/core";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Redirect } from "react-router-dom";

import BoardHeader from "./BoardHeader";
import Columns from "./Columns";
import VoteCountSnackbar from "./VoteCountSnackbar";
import { FlexContainer } from "./styled";
import { BoardContext } from "../context/BoardContext";
import { UserContext } from "../context/UserContext";
import { defaultBoard } from "../utils";
import { ROLE_MODERATOR, ROLE_PARTICIPANT, getUser } from "../utils/userUtils";
import {
  CONNECT,
  UPDATE_BOARD,
  JOIN_BOARD,
  JOIN_ERROR,
  SET_MAX_VOTES,
  RESET_VOTES,
  FOCUS_CARD,
  REMOVE_FOCUS_CARD
} from "../constants/eventNames";
import MergeCardsDialog from "./dialogs/MergeCardsDialog";
import { ALL_COLUMNS } from "../constants/testIds";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  header: {
    padding: theme.spacing(2)
  }
});

// stores the current dragResult of a combine
let combineResult;

function Board(props) {
  const { classes, location } = props;
  const [board, setBoard] = useState(defaultBoard);
  const [isSnackbarOpen, setSnackbar] = useState(false);
  const [isMergeDialogOpen, setMergeDialog] = useState(false);
  const [merge, setMerge] = useState(false);
  const { boardId, socket, setFocusedCard, removeFocusedCard } = useContext(
    BoardContext
  );
  const {
    createModerator,
    createParticipant,
    setMaxVote,
    resetVotes
  } = useContext(UserContext);

  // set tab name
  useEffect(() => {
    document.title = `Retro | ${board.title}`;

    return () => {
      document.title = "Retro";
    };
  }, [board.title]);

  useEffect(() => {
    // pull state, when navigating back and forth
    if (isEqual(board, defaultBoard) && props.match.isExact) {
      socket.emit(JOIN_BOARD, boardId);
    }

    socket.on(CONNECT, () => {
      socket.emit(JOIN_BOARD, boardId);
    });

    socket.on(JOIN_BOARD, boardData => {
      const { boardId, maxVoteCount } = boardData;

      if (location.state && getUser(boardId) === null) {
        createModerator(boardId, ROLE_MODERATOR, maxVoteCount);
      } else if (getUser(boardId) === null) {
        createParticipant(boardId, ROLE_PARTICIPANT, maxVoteCount);
      }

      setBoard(boardData);
    });

    socket.on(JOIN_ERROR, () => {
      setBoard({ ...board, error: true });
    });

    socket.on(UPDATE_BOARD, newBoard => {
      setBoard(newBoard);
    });

    socket.on(SET_MAX_VOTES, newBoard => {
      setMaxVote(boardId, newBoard.maxVoteCount);
      setBoard(newBoard);
      openSnackbar();
    });

    socket.on(RESET_VOTES, newBoard => {
      resetVotes(boardId, newBoard.maxVoteCount);
      setBoard(newBoard);
      openSnackbar();
    });

    socket.on(FOCUS_CARD, focusedCard => {
      setFocusedCard(focusedCard);
    });

    socket.on(REMOVE_FOCUS_CARD, () => {
      removeFocusedCard();
    });

    return () => {
      // Pass nothing to remove all listeners on all events.
      socket.off();
    };

    // eslint-disable-next-line
  }, []);

  function openSnackbar() {
    setSnackbar(true);
  }

  function closeSnackbar() {
    setSnackbar(false);
  }

  function openMergeDialog() {
    setMergeDialog(true);
  }

  function closeMergeDialog() {
    setMergeDialog(false);
  }

  function startMerge() {
    setMerge(true);
  }

  function stopMerge() {
    setMerge(false);
  }

  if (merge) {
    const { columns, items } = board;
    handleCombine(items, columns, combineResult);
  }

  function onDragEnd(dragResult) {
    const { source, destination, type, combine } = dragResult;
    const { columns, columnOrder } = board;

    // store current dragResult and ask the user if he wants to merge
    if (combine) {
      combineResult = dragResult;
      openMergeDialog();
      return;
    }

    if (!destination) {
      return;
    }

    if (isSamePosition(source, destination)) {
      return;
    }

    if (type === "column") {
      handleColumnDrag(dragResult, columnOrder);
      return;
    }

    if (isSameColumn(columns, source, destination)) {
      handleInsideColumnDrag(dragResult, columns);
      return;
    }

    handleNormalDrag(dragResult, columns);
  }

  function handleCombine(items, columns, dragResult) {
    const { combine, draggableId, source } = dragResult;

    // get all related objects of the context of combine
    const itemToCombine = items[combine.draggableId];
    const itemToCombineWith = items[draggableId];
    const itemToCombineWithColumn = columns[source.droppableId];

    // extract the item content
    const originalContent = itemToCombine.content;
    const contentToMerge = itemToCombineWith.content;

    // combine the content
    const newContent = `${originalContent}\n===\n${contentToMerge}`;
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

    const newBoard = {
      ...board,
      columns: {
        ...columns,
        [newColumn.id]: newColumn
      }
    };

    stopMerge();
    setBoard(newBoard);
    socket.emit(UPDATE_BOARD, newBoard, boardId);
  }

  function handleColumnDrag(dragResult, columnOrder) {
    const { source, destination, draggableId } = dragResult;
    const newColumnOrder = Array.from(columnOrder);

    newColumnOrder.splice(source.index, 1);
    newColumnOrder.splice(destination.index, 0, draggableId);

    const newBoard = {
      ...board,
      columnOrder: newColumnOrder
    };

    setBoard(newBoard);
    socket.emit(UPDATE_BOARD, newBoard, boardId);
  }

  function handleInsideColumnDrag(dragResult, columns) {
    const { source, destination, draggableId } = dragResult;

    const startColumn = columns[source.droppableId];
    const newItemIds = Array.from(startColumn.itemIds);

    newItemIds.splice(source.index, 1);
    newItemIds.splice(destination.index, 0, draggableId);

    const newCol = { ...startColumn, itemIds: newItemIds };
    const newBoard = {
      ...board,
      columns: {
        ...columns,
        [newCol.id]: newCol
      }
    };

    setBoard(newBoard);
    socket.emit(UPDATE_BOARD, newBoard, boardId);
  }

  function handleNormalDrag(dragResult, columns) {
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

    const newBoard = {
      ...board,
      columns: {
        ...columns,
        [newStartColumn.id]: newStartColumn,
        [newDestinationColumn.id]: newDestinationColumn
      }
    };

    setBoard(newBoard);
    socket.emit(UPDATE_BOARD, newBoard, boardId);
  }

  function isSamePosition(source, destination) {
    return (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    );
  }

  function isSameColumn(columns, source, destination) {
    return columns[source.droppableId] === columns[destination.droppableId];
  }

  function renderBoard(columns, items) {
    return board.columnOrder.map((columnId, index) => {
      const column = columns[columnId];
      return (
        <Columns
          key={column.id}
          column={column}
          itemMap={items}
          index={index}
          openSnackbar={openSnackbar}
        />
      );
    });
  }

  if (board.error) {
    return <Redirect to={"/error"} />;
  }

  return (
    <Grid container className={classes.root} direction="column">
      <Grid container className={classes.header} direction="row">
        <BoardHeader title={board.title} />
      </Grid>
      <Grid item xs={12}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="allColumns"
            direction="horizontal"
            type="column"
          >
            {provided => (
              <FlexContainer
                {...provided.droppableProps}
                ref={provided.innerRef}
                data-testid={ALL_COLUMNS}
              >
                {renderBoard(board.columns, board.items)}
                {provided.placeholder}
              </FlexContainer>
            )}
          </Droppable>
        </DragDropContext>
      </Grid>
      <VoteCountSnackbar
        id="vote-count-snackbar"
        open={isSnackbarOpen}
        handleClose={closeSnackbar}
        autoHideDuration={1000}
      />
      <MergeCardsDialog
        open={isMergeDialogOpen}
        closeDialog={closeMergeDialog}
        startMerge={startMerge}
        stopMerge={stopMerge}
      />
    </Grid>
  );
}

export default withStyles(styles)(Board);
