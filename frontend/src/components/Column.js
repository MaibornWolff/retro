import React from "react";
import io from "socket.io-client";
import Modal from "react-responsive-modal";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Typography, Grid, withStyles, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SortIcon from "@material-ui/icons/Sort";

import CreateItemButton from "./CreateItemButton";
import { ColumnContainer, ItemsContainerStyles } from "./styled";
import DeleteColumnForm from "./forms/DeleteColumnForm";
import Items from "./Items";
import { LOCAL_BACKEND_ENDPOINT } from "../utils";
import { SORT_COLUMN } from "../events/event-names";

const ItemsContainer = styled.div`
  ${ItemsContainerStyles};
`;

class Column extends React.Component {
  state = {
    isDeleteColumn: false
  };

  onOpenDelete = () => this.setState({ isDeleteColumn: true });

  onCloseDelete = () => this.setState({ isDeleteColumn: false });

  onSort = (columnId, items, boardId) => {
    const socket = io(LOCAL_BACKEND_ENDPOINT);
    socket.emit(SORT_COLUMN, columnId, items, boardId);
  };

  render() {
    const { isDeleteColumn } = this.state;
    const { classes, column, items, index, boardId } = this.props;

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

                <IconButton color="secondary" onClick={this.onOpenDelete}>
                  <DeleteIcon fontSize="small" />
                </IconButton>

                <IconButton
                  color="secondary"
                  onClick={() => this.onSort(column.id, items, boardId)}
                >
                  <SortIcon fontSize="small" />
                </IconButton>

                <Modal
                  open={isDeleteColumn}
                  onClose={this.onCloseDelete}
                  center
                  classNames={{ modal: "custom-modal" }}
                >
                  <DeleteColumnForm columnId={column.id} boardId={boardId} />
                </Modal>
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
  }
}

const styles = theme => ({
  header: {
    padding: theme.spacing.unit,
    backgroundColor: "#f5f5f5"
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

export default withStyles(styles)(Column);
