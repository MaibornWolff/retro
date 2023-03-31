import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Box, Card, Divider, useTheme } from "@mui/material";

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
  const theme = useTheme();

  return (
    <Draggable draggableId={column.id} index={column.index} isDragDisabled={!isModerator(user)}>
      {(providedDraggable) => (
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "25rem",
            mx: 2,
            borderRadius: theme.spacing(2),
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
              <Box
                flex={1}
                p={2}
                sx={{ transition: "background-color 0.2s ease" }}
                ref={providedDroppable.innerRef}
                {...providedDroppable.droppableProps}
              >
                <Cards column={column} />
                {providedDroppable.placeholder}
              </Box>
            )}
          </Droppable>
        </Card>
      )}
    </Draggable>
  );
}
