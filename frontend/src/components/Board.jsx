import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";

import seed from "../utils/seed";
import Column from "./Column";

const Container = styled.div`
  display: flex;
`;

export default class Board extends React.Component {
  state = seed;

  onDragEnd = (dragResult) => {
    const { draggableId, source, destination } = dragResult;
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

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    // column is the same
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...start, taskIds: newTaskIds };
      const newState = {
        ...this.state,
        columns: {
          ...columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState);
      return;
    }

    // moving from one column to another one
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          {this.state.columnOrder.map((colId) => {
            const column = this.state.columns[colId];
            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </Container>
      </DragDropContext>
    );
  }
}
