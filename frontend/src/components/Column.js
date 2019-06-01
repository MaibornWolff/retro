import React from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Grid, withStyles } from "@material-ui/core";

import Items from "./Items";
import CreateItemDialog from "./dialogs/CreateItemDialog";
import ColumnMenu from "./ColumnMenu";
import ColumnName from "./ColumnName";
import { ColumnContainer, ItemsContainerStyles } from "./styled";

const ItemsContainer = styled.div`
  ${ItemsContainerStyles};
`;

const styles = theme => ({
  header: {
    padding: theme.spacing(1),
    backgroundColor: "#44777e",
    color: "#fff"
  }
});

function Column(props) {
  const { classes, column, items, index, openSnackbar } = props;

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
              <ColumnName classes={classes} columnTitle={column.columnTitle} />
            </Grid>
            <Grid item>
              <CreateItemDialog columnId={column.id} />
              <ColumnMenu
                columnId={column.id}
                columnTitle={column.columnTitle}
                items={items}
              />
            </Grid>
          </Grid>

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
                <Items items={items} openSnackbar={openSnackbar} />
                {providedDroppable.placeholder}
              </ItemsContainer>
            )}
          </Droppable>
        </ColumnContainer>
      )}
    </Draggable>
  );
}

export default withStyles(styles)(Column);
