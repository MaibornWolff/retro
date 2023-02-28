import React from "react";
import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Card } from "@mui/material";

import Cards from "../cards/Cards";
import ColumnHeader from "./column-header/ColumnHeader";
import { CardsContainerStyles, ColumnContainerStyles } from "../../../common/styled-components";
import { RetroColumn } from "../../types/retroTypes";
import { useUserContext } from "../../../common/context/UserContext";

const ColumnContainer = styled(Card)`
  ${ColumnContainerStyles}
`;

const CardsContainer = styled.div`
  ${CardsContainerStyles};
`;

interface ColumnProps {
  column: RetroColumn;
}

function Column({ column }: ColumnProps) {
  const { user } = useUserContext();

  return (
    <Draggable
      draggableId={column.id}
      index={column.index}
      isDragDisabled={user.role !== "moderator"}
    >
      {(providedDraggable) => (
        <ColumnContainer
          {...providedDraggable.draggableProps}
          {...providedDraggable.dragHandleProps}
          ref={providedDraggable.innerRef}
          raised
        >
          <ColumnHeader column={column} />
          <Droppable droppableId={column.id} type="item" isCombineEnabled={true}>
            {(providedDroppable, snapshot) => (
              <CardsContainer
                ref={providedDroppable.innerRef}
                {...providedDroppable.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <Cards column={column} />
                {providedDroppable.placeholder}
              </CardsContainer>
            )}
          </Droppable>
        </ColumnContainer>
      )}
    </Draggable>
  );
}

export default Column;
