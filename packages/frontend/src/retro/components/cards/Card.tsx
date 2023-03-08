import React from "react";
import { Draggable } from "react-beautiful-dnd";

import { CardContainer } from "../../../common/styled-components";
import { RetroCard as RetroCardType } from "../../types/retroTypes";
import RetroCard from "./RetroCard";
import { useUserContext } from "../../../common/context/UserContext";
import { isModerator } from "../../../common/utils/participantsUtils";

interface ItemProps {
  card: RetroCardType;
  columnIndex: number;
  isBlurred: boolean;
}

function Card({ card, isBlurred, columnIndex }: ItemProps) {
  const { user } = useUserContext();

  return (
    <Draggable draggableId={card.id} index={card.index} isDragDisabled={!isModerator(user)}>
      {(provided) => (
        <CardContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <RetroCard card={card} isBlurred={isBlurred} columnIndex={columnIndex} />
        </CardContainer>
      )}
    </Draggable>
  );
}

export default Card;
