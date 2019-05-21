import React from "react";
import { Draggable } from "react-beautiful-dnd";

import RetroItem from "./RetroItem";
import { ItemContainer } from "./styled";

const Item = props => {
  const { item, index, boardId, openSnackbar } = props;

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <ItemContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <RetroItem
            id={item.id}
            author={item.author}
            content={item.content}
            points={item.points}
            isBlurred={item.isBlurred}
            boardId={boardId}
            openSnackbar={openSnackbar}
          />
        </ItemContainer>
      )}
    </Draggable>
  );
};

export default Item;
