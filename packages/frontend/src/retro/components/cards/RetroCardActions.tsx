import React from "react";
import { RetroCard } from "../../types/retroTypes";
import { useUserContext } from "../../../common/context/UserContext";
import { EditCardButton } from "./EditCardButton";
import { MarkAsDiscussedButton } from "./MarkAsDiscussedButton";
import { DeleteCardButton } from "./DeleteCardButton";
import { RemoveUpvoteCardButton } from "./RemoveUpvoteCardButton";
import { UpvoteCardButton } from "./UpvoteCardButton";
import { Box } from "@mui/material";
import { useRetroContext } from "../../context/RetroContext";

interface RetroCardActionsProps {
  card: RetroCard;
  columnIndex: number;
  isBlurred: boolean;
}

export function RetroCardActions({ card, columnIndex, isBlurred }: RetroCardActionsProps) {
  const { user } = useUserContext();
  const { retroState } = useRetroContext();
  const { isVotingEnabled } = retroState;

  const isButtonDisabled = isBlurred && user.role === "participant";

  return (
    <Box>
      {isVotingEnabled && (
        <>
          <UpvoteCardButton disabled={isButtonDisabled} card={card} columnIndex={columnIndex} />
          <RemoveUpvoteCardButton
            disabled={isButtonDisabled}
            card={card}
            columnIndex={columnIndex}
          />
        </>
      )}
      <EditCardButton disabled={isButtonDisabled} card={card} columnIndex={columnIndex} />
      <MarkAsDiscussedButton disabled={isButtonDisabled} card={card} columnIndex={columnIndex} />
      <DeleteCardButton disabled={isButtonDisabled} card={card} columnIndex={columnIndex} />
    </Box>
  );
}
