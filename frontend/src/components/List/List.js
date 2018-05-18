import React from "react";
import { Droppable } from "react-beautiful-dnd";

import RetroItem from "../RetroItem";
import "./List.css"

const grid = 8;

const List = (props) => (
  <div className="list">
    <h3>{props.title}</h3>
    <Droppable droppableId={props.droppableId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {
            props.items.map((item, index) => (
              <RetroItem
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
  </div>
);

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'blue',
  padding: grid,
  width: 250
});

export {List};