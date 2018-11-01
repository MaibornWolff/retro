import React from "react";
import io from "socket.io-client";
import Modal from "react-responsive-modal";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Typography, Grid, withStyles } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrashAlt,
  faSortAmountDown
} from "@fortawesome/free-solid-svg-icons";

import { ColumnContainer, ItemsContainerStyles, ButtonStyles } from "./styled";
import { Button } from "./common";
import CreateItemForm from "./forms/CreateItemForm";
import DeleteColumnForm from "./forms/DeleteColumnForm";
import Items from "./Items";
import { LOCAL_BACKEND_ENDPOINT } from "../utils";
import { SORT_COLUMN } from "../events/event-names";

const ItemsContainer = styled.div`
  ${ItemsContainerStyles};
`;

const ColumnActionButton = styled(Button)`
  margin-left: 0.5em;
  ${ButtonStyles};
`;

class Column extends React.Component {
  state = {
    isCreateColumn: false,
    isDeleteColumn: false
  };

  onOpenCreate = () => this.setState({ isCreateColumn: true });

  onCloseCreate = () => this.setState({ isCreateColumn: false });

  onOpenDelete = () => this.setState({ isDeleteColumn: true });

  onCloseDelete = () => this.setState({ isDeleteColumn: false });

  onSort = (columnId, items, boardId) => {
    const socket = io(LOCAL_BACKEND_ENDPOINT);
    socket.emit(SORT_COLUMN, columnId, items, boardId);
  };

  render() {
    const { isCreateColumn, isDeleteColumn } = this.state;
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
                <Typography variant="h6">{column.columnTitle}</Typography>
              </Grid>
              <Grid item>
                <Grid container direction="row" justify="space-between">
                  <Grid item>
                    <ColumnActionButton
                      className="is-primary is-rounded is-small"
                      onClick={this.onOpenCreate}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </ColumnActionButton>

                    <Modal
                      open={isCreateColumn}
                      onClose={this.onCloseCreate}
                      center
                      classNames={{ modal: "custom-modal" }}
                    >
                      <CreateItemForm columnId={column.id} boardId={boardId} />
                    </Modal>
                  </Grid>
                  <Grid item>
                    <ColumnActionButton
                      className="is-danger is-rounded is-small"
                      onClick={this.onOpenDelete}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </ColumnActionButton>

                    <Modal
                      open={isDeleteColumn}
                      onClose={this.onCloseDelete}
                      center
                      classNames={{ modal: "custom-modal" }}
                    >
                      <DeleteColumnForm
                        columnId={column.id}
                        boardId={boardId}
                      />
                    </Modal>
                  </Grid>
                  <Grid item>
                    <ColumnActionButton
                      className="is-info is-rounded is-small"
                      onClick={() => this.onSort(column.id, items, boardId)}
                    >
                      <FontAwesomeIcon icon={faSortAmountDown} />
                    </ColumnActionButton>
                  </Grid>
                </Grid>
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
