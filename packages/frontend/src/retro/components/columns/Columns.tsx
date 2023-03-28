import React from "react";

import { Column } from "./Column";
import { Droppable } from "react-beautiful-dnd";
import { useRetroContext } from "../../context/RetroContext";

export function Columns() {
  const { retroState } = useRetroContext();

  return (
    <Droppable droppableId="allColumns" direction="horizontal" type="column">
      {(provided) => (
        <div
          style={{ display: "flex", whiteSpace: "nowrap", overflowX: "auto" }}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {retroState.columns.map((column) => {
            return <Column key={column.id} column={column} />;
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
