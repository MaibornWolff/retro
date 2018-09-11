import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

import Card from "./common/Card";

const Container = styled.div`
  margin-bottom: 1.5em;
  box-shadow: 4px 4px 1px lightgrey;
`;

const Item = props => {
  const { item, index } = props;

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <Container
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
          />
        </Container>
      )}
    </Draggable>
  );
};

export default Item;
