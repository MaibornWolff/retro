import React from "react";
import Modal from "react-responsive-modal";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Title from "./common/Title";
import Button from "./common/Button";
import BoardItemForm from "./BoardItemForm";
import BoardColumnInnerList from "./BoardColumnInnerList";

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
  background-color: ${props =>
    (props.isDraggingOver ? "lightgrey" : "inherit")};
  flex-grow: 1;
  min-height: 100px;
`;

const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 1em;
`;

export default class BoardColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };

    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  onOpenModal() {
    this.setState({ open: true });
  }

  onCloseModal() {
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state;
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
              <Button
                className="is-info is-rounded is-small"
                onClick={this.onOpenModal}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
              <Modal
                open={open}
                onClose={this.onCloseModal}
                center
                classNames={{ modal: "custom-modal" }}
              >
                <BoardItemForm
                  columnId={column.id}
                  boardItemsCount={boardItemsCount}
                />
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
