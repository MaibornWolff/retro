import React from "react";
import { DragDropContext } from "react-beautiful-dnd";

import seed from "../utils/seed";
import Column from "./Column";

export default class Board extends React.Component {
  state = seed;

  onDragEnd = result => {
    // TODO: reorder our column
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map(colId => {
          const column = this.state.columns[colId];
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    );
  }
}
