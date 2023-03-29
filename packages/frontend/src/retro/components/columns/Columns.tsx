import React from "react";

import { Column } from "./Column";
import { Droppable } from "react-beautiful-dnd";
import { useRetroContext } from "../../context/RetroContext";
import { FlexBox } from "../../../common/components/FlexBox";

export function Columns() {
  const { retroState } = useRetroContext();

  return (
    <Droppable droppableId="allColumns" direction="horizontal" type="column">
      {(provided) => (
        <FlexBox
          whiteSpace="nowrap"
          style={{ overflowX: "auto" }}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {retroState.columns.map((column) => {
            return <Column key={column.id} column={column} />;
          })}
          {provided.placeholder}
        </FlexBox>
      )}
    </Droppable>
  );
}
