import React from "react";
import { Droppable } from "react-beautiful-dnd";

import Card from "./Card";

import "../styles/Column.css";

export default class Column extends React.Component {
  render() {
    const { column, tasks } = this.props;

    return (
      <div id="column-container">
        <h3 id="column-title" className="title is-3">
          {column.title}
        </h3>
        <Droppable droppableId={column.id}>
          {provided => (
            <div
              id="column-tasks-container"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks.map((t, i) => (
                <Card key={t.id} task={t} index={i} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}
