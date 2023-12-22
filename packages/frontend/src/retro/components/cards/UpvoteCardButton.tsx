import React from "react";
import { ThumbUp } from "@mui/icons-material";
import { IconButtonProps } from "@mui/material";
import { useVotesLeft } from "../../hooks/useVotesLeft";
import { useRetroContext } from "../../context/RetroContext";
import { RetroCard } from "../../types/retroTypes";
import { useUserContext } from "../../../common/context/UserContext";
import { CardActionButton } from "./CardActionButton";

interface UpvoteItemButtonProps extends IconButtonProps {
  card: RetroCard;
  columnIndex: number;
}

export function UpvoteCardButton({ columnIndex, card, ...props }: UpvoteItemButtonProps) {
  const { retroState, handleUpvoteCard } = useRetroContext();
  const { cardVotingLimit } = retroState;
  const { user } = useUserContext();
  const votesLeft = useVotesLeft();
  const votingLimitReached = (card.votes[user.id] ?? 0) >= cardVotingLimit;
  const canUpvote = votesLeft > 0 && !votingLimitReached;

  function handleUpvote() {
    if (!canUpvote) return;
    handleUpvoteCard({ columnIndex, cardIndex: card.index, userId: user.id });
  }

  return (
    <CardActionButton
      {...props}
      disabled={props.disabled ? true : !canUpvote}
      onClick={handleUpvote}
      tooltipText="Upvote Card"
    >
      <ThumbUp />
    </CardActionButton>
  );
}
