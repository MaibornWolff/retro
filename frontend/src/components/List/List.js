import React from "react";
import { Droppable } from "react-beautiful-dnd";

import Card from "../Card";

const grid = 8;

export default (props) => (
  <Droppable droppableId={props.droppableId}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        style={getListStyle(snapshot.isDraggingOver)}
      >
        {
          props.items.map((item, index) => (
            <Card
              key={item.id}
              draggableId={item.id}
              index={index}
              content={item.content}
            />
          ))
        }
      </div>
    )}
  </Droppable>
);

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'red',
  padding: grid,
  width: 250
});
