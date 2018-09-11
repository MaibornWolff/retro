import React from "react";
import Modal from "react-responsive-modal";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import Title from "./common/Title";
import Button from "./common/Button";
import BoardItemForm from "./BoardItemForm";
import BoardColumnInnerList from "./BoardColumnInnerList";
import BoardDeleteColumnForm from "./BoardDeleteColumnForm";

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

const CardList = styled.div`
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

export default class BoardColumn extends React.Component {
  state = {
    isCreateColumn: false,
    isDeleteColumn: false
  };

  onOpenCreate = () => this.setState({ isCreateColumn: true });

  onCloseCreate = () => this.setState({ isCreateColumn: false });

  onOpenDelete = () => this.setState({ isDeleteColumn: true });

  onCloseDelete = () => this.setState({ isDeleteColumn: false });

  render() {
    const { isCreateColumn, isDeleteColumn } = this.state;
    const { column, items, index, boardItemsCount } = this.props;

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
              </ButtonContainer>

              <Modal
                open={isCreateColumn}
                onClose={this.onCloseCreate}
                center
                classNames={{ modal: "custom-modal" }}
              >
                <BoardItemForm
                  columnId={column.id}
                  boardItemsCount={boardItemsCount}
                />
              </Modal>
              <Modal
                open={isDeleteColumn}
                onClose={this.onCloseDelete}
                center
                classNames={{ modal: "custom-modal" }}
              >
                <BoardDeleteColumnForm columnId={column.id} />
              </Modal>
            </ColumnHeader>

            <Droppable droppableId={column.id} type="item">
              {(providedDroppable, snapshot) => (
                <CardList
                  innerRef={providedDroppable.innerRef}
                  {...providedDroppable.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <BoardColumnInnerList items={items} />
                  {providedDroppable.placeholder}
                </CardList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}
