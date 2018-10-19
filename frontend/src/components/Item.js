import React from "react";
import { Draggable } from "react-beautiful-dnd";

import { ItemContainer } from "./styled";
import { Card } from "./common";

const Item = props => {
  const { item, index, boardId } = props;

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <ItemContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Card
            cardId={item.id}
            cardTitle={item.author}
            cardContent={item.content}
            cardPoints={item.points}
            boardId={boardId}
          />
        </ItemContainer>
      )}
    </Draggable>
  );
};

export default Item;
