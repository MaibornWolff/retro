import React from "react";
import { DragDropContext } from "react-beautiful-dnd";

import seed from "../utils/seed";
import Column from "./Column";

export default class Board extends React.Component {
  state = seed;

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    const { columns } = this.state;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId
      && destination.index === source.index
    ) {
      return;
    }

    const column = columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = { ...column, taskIds: newTaskIds };
    const newState = {
      ...this.state,
      columns: {
        ...columns,
        [newColumn.id]: newColumn,
      },
    };

    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map((colId) => {
          const column = this.state.columns[colId];
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    );
  }
}
