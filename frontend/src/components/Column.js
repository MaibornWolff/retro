import React from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Typography, Grid, withStyles } from "@material-ui/core";

import Items from "./Items";
import CreateItemButton from "./CreateItemButton";
import DeleteColumnButton from "./DeleteColumnButton";
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
              <CreateItemButton columnId={column.id} boardId={boardId} />
              <DeleteColumnButton columnId={column.id} boardId={boardId} />
              <SortColumnButton
                columnId={column.id}
                boardId={boardId}
                items={items}
              />
            </Grid>
          </Grid>

          <Droppable droppableId={column.id} type="item">
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
    backgroundColor: "#f5f5f5"
  }
});

export default withStyles(styles)(Column);
