import React from "react";
import { Draggable } from "react-beautiful-dnd";

import RetroItem from "./RetroItem";
import { ItemContainer } from "../styled";

function Item(props) {
  const { item, index, openSnackbar, isVoted } = props;
  const { id, author, content, points, isBlurred } = item;

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <ItemContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <RetroItem
            id={id}
            author={author}
            content={content}
            points={points}
            isBlurred={isBlurred}
            isVoted={isVoted}
            openSnackbar={openSnackbar}
          />
        </ItemContainer>
      )}
    </Draggable>
  );
}

export default Item;
