import React from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Typography, Grid, withStyles } from "@material-ui/core";

import Items from "./Items";
import CreateItemDialog from "./dialogs/CreateItemDialog";
import DeleteColumnDialog from "./dialogs/DeleteColumnDialog";
import SortColumnButton from "./SortColumnButton";
import { ColumnContainer, ItemsContainerStyles } from "./styled";

const ItemsContainer = styled.div`
  ${ItemsContainerStyles};
`;

const Column = props => {
  const { classes, column, items, index, boardId } = props;

  return (
    <Draggable draggableId={column.id} index={index}>
      {providedDraggable => (
        <ColumnContainer
          {...providedDraggable.draggableProps}
          {...providedDraggable.dragHandleProps}
          ref={providedDraggable.innerRef}
        >
          <Grid
            className={classes.header}
            container
            direction="row"
            justify="space-between"
          >
            <Grid item>
              <Typography className={classes.header} variant="h6">
                {column.columnTitle}
              </Typography>
            </Grid>
            <Grid item>
              <CreateItemDialog columnId={column.id} boardId={boardId} />
              <DeleteColumnDialog columnId={column.id} boardId={boardId} />
              <SortColumnButton
                columnId={column.id}
                boardId={boardId}
                items={items}
              />
            </Grid>
          </Grid>

          <Grid container direction="column" />

          <Droppable
            droppableId={column.id}
            type="item"
            isCombineEnabled={true}
          >
            {(providedDroppable, snapshot) => (
              <ItemsContainer
                ref={providedDroppable.innerRef}
                {...providedDroppable.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <Items items={items} boardId={boardId} />
                {providedDroppable.placeholder}
              </ItemsContainer>
            )}
          </Droppable>
        </ColumnContainer>
      )}
    </Draggable>
  );
};

const styles = theme => ({
  header: {
    padding: theme.spacing.unit,
    backgroundColor: "#44777e",
    color: "#fff"
  }
});

export default withStyles(styles)(Column);
