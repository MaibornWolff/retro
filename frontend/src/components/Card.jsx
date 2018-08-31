import React from "react";
import { Draggable } from "react-beautiful-dnd";

import "../styles/Card.css";

export default class Card extends React.Component {
  render() {
    const { task, index } = this.props;

    return (
      <Draggable draggableId={task.id} index={index}>
        {provided => (
          <div
            id="card-container"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {task.content}
          </div>
        )}
      </Draggable>
    );
  }
}
