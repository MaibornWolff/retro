import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

import Card from "./Card";
import Title from "./common/Title";

const Container = styled.div`
  width: 400px;
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;

  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled(Title)`
  padding: 8px;
`;

const CardList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? "lightblue" : "white")}
  flex-grow: 1;
  min-height: 100px;
`;

const Column = (props) => {
  const { column, tasks } = props;

  return (
    <Container>
      <StyledTitle>{column.title}</StyledTitle>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <CardList
            innerRef={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <Card key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </CardList>
        )}
      </Droppable>
    </Container>
  );
};

export default Column;
