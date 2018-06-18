import React from "react";
import { Droppable } from "react-beautiful-dnd";

import { RetroItem } from "./RetroItem";
import { Button } from "./Button";

import "../styles/List.css";

const grid = 8;

export const List = ({ title, droppableId, items }) => (
  <div className="list">
    <h3 className="title is-3">
      {title}
      <Button
        className="button is-primary is-pulled-right"
        text="+"
        onClick={() => {}}
      />
    </h3>

    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
          className="droppableContainer"
        >
          {
            items.map((item, index) => (
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
