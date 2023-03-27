import React from "react";
import styled, { css } from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Card, Divider } from "@mui/material";

import { Cards } from "../cards/Cards";
import { ColumnHeader } from "./column-header/ColumnHeader";
import { RetroColumn } from "../../types/retroTypes";
import { useUserContext } from "../../../common/context/UserContext";
import { isModerator } from "../../../common/utils/participantsUtils";
import { media } from "../../../common/styled-components/styled.utils";

const ColumnContainer = styled(Card)`
  ${css`
    display: flex;
    flex-direction: column;
    min-width: 25rem;
    margin: 0.8em 0.2em 0.8em 0.2em;
    ${media.tablet ? `margin: 0.8em;` : ""}
  `}
`;

const CardsContainer = styled.div`
  ${css`
    flex: 1;
    padding: 0.2em;
    ${media.tablet ? `padding: 1em;` : ""}
    transition: background-color 0.2s ease;
  `};
`;

interface ColumnProps {
  column: RetroColumn;
}

export function Column({ column }: ColumnProps) {
  const { user } = useUserContext();

  return (
    <Draggable draggableId={column.id} index={column.index} isDragDisabled={!isModerator(user)}>
      {(providedDraggable) => (
        <ColumnContainer
          {...providedDraggable.draggableProps}
          {...providedDraggable.dragHandleProps}
          ref={providedDraggable.innerRef}
          elevation={3}
          style={{ borderRadius: "15px" }}
        >
          <ColumnHeader column={column} />
          <Divider />
          <Droppable droppableId={column.id} type="item" isCombineEnabled={true}>
            {(providedDroppable) => (
              <CardsContainer
                ref={providedDroppable.innerRef}
                {...providedDroppable.droppableProps}
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
