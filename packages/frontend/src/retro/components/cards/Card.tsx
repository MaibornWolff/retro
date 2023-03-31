import React from "react";
import { Draggable } from "react-beautiful-dnd";

import { RetroCard as RetroCardType } from "../../types/retroTypes";
import { RetroCard } from "./RetroCard";
import { useUserContext } from "../../../common/context/UserContext";
import { isModerator } from "../../../common/utils/participantsUtils";
import { Box } from "@mui/material";

interface ItemProps {
  card: RetroCardType;
  columnIndex: number;
  isBlurred: boolean;
}

export function Card({ card, isBlurred, columnIndex }: ItemProps) {
  const { user } = useUserContext();

  return (
    <Draggable draggableId={card.id} index={card.index} isDragDisabled={!isModerator(user)}>
      {(provided) => (
        <Box {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <RetroCard card={card} isBlurred={isBlurred} columnIndex={columnIndex} />
        </Box>
      )}
    </Draggable>
  );
}
