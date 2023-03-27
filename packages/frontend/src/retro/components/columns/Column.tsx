import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Card, Divider } from "@mui/material";

import { Cards } from "../cards/Cards";
import { ColumnHeader } from "./column-header/ColumnHeader";
import { RetroColumn } from "../../types/retroTypes";
import { useUserContext } from "../../../common/context/UserContext";
import { isModerator } from "../../../common/utils/participantsUtils";

interface ColumnProps {
  column: RetroColumn;
}

export function Column({ column }: ColumnProps) {
  const { user } = useUserContext();

  return (
    <Draggable draggableId={column.id} index={column.index} isDragDisabled={!isModerator(user)}>
      {(providedDraggable) => (
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: "25rem",
            margin: "0.8em",
            borderRadius: "15px",
          }}
          {...providedDraggable.draggableProps}
          {...providedDraggable.dragHandleProps}
          ref={providedDraggable.innerRef}
          elevation={3}
        >
          <ColumnHeader column={column} />
          <Divider />
          <Droppable droppableId={column.id} type="item" isCombineEnabled={true}>
            {(providedDroppable) => (
              <div
                style={{
                  flex: 1,
                  padding: "1em",
                  transition: "background-color 0.2s ease",
                }}
                ref={providedDroppable.innerRef}
                {...providedDroppable.droppableProps}
              >
                <Cards column={column} />
                {providedDroppable.placeholder}
              </div>
            )}
          </Droppable>
        </Card>
      )}
    </Draggable>
  );
}
