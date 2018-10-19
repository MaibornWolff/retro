import React from "react";
import io from "socket.io-client";
import Modal from "react-responsive-modal";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrashAlt,
  faSortAmountDown
} from "@fortawesome/free-solid-svg-icons";

import {
  ColumnContainer,
  ColumnHeader,
  FlexContainer,
  ItemsContainerStyles,
  ColumnTitleStyles,
  ColumnActionButtonStyles
} from "./styled";
import { Title, Button } from "./common";
import CreateItemForm from "./forms/CreateItemForm";
import DeleteColumnForm from "./forms/DeleteColumnForm";
import Items from "./Items";
import { LOCAL_BACKEND_ENDPOINT } from "../utils";
import { SORT_COLUMN } from "../events/event-names";

import "../styles/Modal.css";

const ItemsContainer = styled.div`
  ${ItemsContainerStyles};
`;

const ColumnTitle = styled(Title)`
  ${ColumnTitleStyles};
`;

const ColumnActionButton = styled(Button)`
  ${ColumnActionButtonStyles};
`;

export default class Column extends React.Component {
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
    const { column, items, index, boardId } = this.props;

    return (
      <Draggable draggableId={column.id} index={index}>
        {providedDraggable => (
          <ColumnContainer
            {...providedDraggable.draggableProps}
            {...providedDraggable.dragHandleProps}
            innerRef={providedDraggable.innerRef}
          >
            <ColumnHeader>
              <ColumnTitle className="is-5">{column.title}</ColumnTitle>

              <FlexContainer>
                <ColumnActionButton
                  className="is-primary is-rounded is-small"
                  onClick={this.onOpenCreate}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </ColumnActionButton>
                <ColumnActionButton
                  className="is-danger is-rounded is-small"
                  onClick={this.onOpenDelete}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </ColumnActionButton>
                <ColumnActionButton
                  className="is-info is-rounded is-small"
                  onClick={() => this.onSort(column.id, items, boardId)}
                >
                  <FontAwesomeIcon icon={faSortAmountDown} />
                </ColumnActionButton>
              </FlexContainer>

              <Modal
                open={isCreateColumn}
                onClose={this.onCloseCreate}
                center
                classNames={{ modal: "custom-modal" }}
              >
                <CreateItemForm columnId={column.id} boardId={boardId} />
              </Modal>

              <Modal
                open={isDeleteColumn}
                onClose={this.onCloseDelete}
                center
                classNames={{ modal: "custom-modal" }}
              >
                <DeleteColumnForm columnId={column.id} boardId={boardId} />
              </Modal>
            </ColumnHeader>

            <Droppable droppableId={column.id} type="item">
              {(providedDroppable, snapshot) => (
                <ItemsContainer
                  innerRef={providedDroppable.innerRef}
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
