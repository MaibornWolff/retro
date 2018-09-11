import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

import Card from "./common/Card";

const Container = styled.div`
  margin-bottom: 1.5em;
  box-shadow: 4px 4px 1px lightgrey;
`;

export default class Item extends React.Component {
  render() {
    const { item, index } = this.props;

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
  }
}
