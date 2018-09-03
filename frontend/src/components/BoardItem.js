import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

import Card from "./common/Card";

const Container = styled.div`
  margin-bottom: 8px;
`;

const BoardItem = props => {
  const { task, index } = props;

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Card
            cardTitle={task.author}
            cardContent={task.content}
            cardFooter={`Points: ${task.points}`}
          />
        </Container>
      )}
    </Draggable>
  );
};

export default BoardItem;
