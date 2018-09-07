import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

import Card from "./common/Card";

const Container = styled.div`
  margin-bottom: 10px;
  box-shadow: 2px 2px 1px lightgrey;
`;

const BoardItem = props => {
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
            cardTitle={item.author}
            cardContent={item.content}
            cardPoints={`${item.points} Points`}
          />
        </Container>
      )}
    </Draggable>
  );
};

export default BoardItem;
