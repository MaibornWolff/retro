import React from "react";
import socketIO from "socket.io-client";
import Modal from "react-responsive-modal";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrashAlt,
  faSortAmountDown
} from "@fortawesome/free-solid-svg-icons";

import Title from "./common/Title";
import Button from "./common/Button";
import CreateItemForm from "./CreateItemForm";
import DeleteColumnForm from "./DeleteColumnForm";
import Items from "./Items";
import { LOCAL_BACKEND_ENDPOINT, SORT_COLUMN } from "../utils/constants";

import "../styles/Modal.css";

const Container = styled.div`
  width: 400px;
  margin: 1em;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: white;
  box-shadow: 2px 2px 1px lightgrey;
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled(Title)`
  padding: 8px;
  margin-bottom: 0 !important;
`;

const ItemsContainer = styled.div`
  padding: 1em;
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 100px;
  background-color: ${props =>
    props.isDraggingOver ? "lightgrey" : "inherit"};
`;

const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 1em;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const ColumnActionButton = styled(Button)`
  margin-left: 0.2em;
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

  onSort = (columnId, items) => {
    const socket = socketIO(LOCAL_BACKEND_ENDPOINT);
    socket.emit(SORT_COLUMN, columnId, items);
  };

  render() {
    const { isCreateColumn, isDeleteColumn } = this.state;
    const { column, items, index, itemsCount } = this.props;

    return (
      <Draggable draggableId={column.id} index={index}>
        {providedDraggable => (
          <Container
            {...providedDraggable.draggableProps}
            {...providedDraggable.dragHandleProps}
            innerRef={providedDraggable.innerRef}
          >
            <ColumnHeader>
              <StyledTitle className="is-5">{column.title}</StyledTitle>

              <ButtonContainer>
                <ColumnActionButton
                  className="is-success is-rounded is-small"
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
                  onClick={() => this.onSort(column.id, items)}
                >
                  <FontAwesomeIcon icon={faSortAmountDown} />
                </ColumnActionButton>
              </ButtonContainer>

              <Modal
                open={isCreateColumn}
                onClose={this.onCloseCreate}
                center
                classNames={{ modal: "custom-modal" }}
              >
                <CreateItemForm columnId={column.id} itemsCount={itemsCount} />
              </Modal>

              <Modal
                open={isDeleteColumn}
                onClose={this.onCloseDelete}
                center
                classNames={{ modal: "custom-modal" }}
              >
                <DeleteColumnForm columnId={column.id} />
              </Modal>
            </ColumnHeader>

            <Droppable droppableId={column.id} type="item">
              {(providedDroppable, snapshot) => (
                <ItemsContainer
                  innerRef={providedDroppable.innerRef}
                  {...providedDroppable.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <Items items={items} />
                  {providedDroppable.placeholder}
                </ItemsContainer>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}
