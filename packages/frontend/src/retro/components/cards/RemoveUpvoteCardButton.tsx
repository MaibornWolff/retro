import React from "react";
import { ThumbDown } from "@mui/icons-material";
import { IconButtonProps } from "@mui/material";
import { useRetroContext } from "../../context/RetroContext";
import { RetroCard } from "../../types/retroTypes";
import { useUserContext } from "../../../common/context/UserContext";
import { isCardVotedByUser } from "../../utils/cardUtils";
import { CardActionButton } from "./CardActionButton";

interface RemoveUpvoteItemButtonProps extends IconButtonProps {
  card: RetroCard;
  columnIndex: number;
}

export function RemoveUpvoteCardButton({
  columnIndex,
  card,
  ...props
}: RemoveUpvoteItemButtonProps) {
  const { handleRemoveUpvoteFromCard } = useRetroContext();
  const { user } = useUserContext();

  function handleRemoveUpvote() {
    if (!isCardVotedByUser(card, user.id)) return;
    handleRemoveUpvoteFromCard({ columnIndex, cardIndex: card.index, userId: user.id });
  }

  return (
    <CardActionButton
      {...props}
      tooltipText="Remove Upvote"
      aria-label="Remove Upvote"
      onClick={handleRemoveUpvote}
      disabled={(props.disabled ?? false) || !isCardVotedByUser(card, user.id)}
    >
      <ThumbDown />
    </CardActionButton>
  );
}
