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
          className="droppableContainer"
        >
          {
            props.items.map((item, index) => (
              <RetroItem
                key={item.id}
                draggableId={item.id}
                index={index}
                author={item.author}
                content={item.content}
                points={item.points}
              />
            ))
          }
        </div>
      )}
    </Droppable>
  </div>
);

const getListStyle = isDraggingOver => ({
  padding: grid,
  width: 400,
  borderColor: "black 1px solid"
});

export {List};