import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import Card from "./Card";
import Title from "./common/Title";

const Container = styled.div`
  width: 400px;
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: white;

  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled(Title)`
  padding: 8px;
`;

const CardList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? "lightblue" : "inherit")}
  flex-grow: 1;
  min-height: 100px;
`;

const Column = props => {
  const { column, tasks, index } = props;

  return (
    <Draggable draggableId={column.id} index={index}>
      {providedDraggable => (
        <Container
          {...providedDraggable.draggableProps}
          {...providedDraggable.dragHandleProps}
          innerRef={providedDraggable.innerRef}
        >
          <StyledTitle>{column.title}</StyledTitle>
          <Droppable droppableId={column.id} type="task">
            {(providedDroppable, snapshot) => (
              <CardList
                innerRef={providedDroppable.innerRef}
                {...providedDroppable.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {tasks.map((task, i) => (
                  <Card key={task.id} task={task} index={i} />
                ))}
                {providedDroppable.placeholder}
              </CardList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};

export default Column;
