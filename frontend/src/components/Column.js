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

class Column extends React.Component {
  render() {
    const { classes, column, items, index, boardId, openSnackbar } = this.props;

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
                <ColumnName
                  classes={classes}
                  columnTitle={column.columnTitle}
                />
              </Grid>
              <Grid item>
                <CreateItemDialog columnId={column.id} boardId={boardId} />
                <ColumnMenu
                  columnId={column.id}
                  boardId={boardId}
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
                  <Items
                    items={items}
                    boardId={boardId}
                    openSnackbar={openSnackbar}
                  />
                  {providedDroppable.placeholder}
                </ItemsContainer>
              )}
            </Droppable>
          </ColumnContainer>
        )}
      </Draggable>
    );
  }
}

const styles = theme => ({
  header: {
    padding: theme.spacing.unit,
    backgroundColor: "#44777e",
    color: "#fff"
  }
});

export default withStyles(styles)(Column);
