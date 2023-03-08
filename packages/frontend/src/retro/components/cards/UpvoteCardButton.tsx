import React from "react";
import { ThumbUp } from "@mui/icons-material";
import { IconButtonProps } from "@mui/material";
import { useVotesLeft } from "../../hooks/useVotesLeft";
import { useRetroContext } from "../../context/RetroContext";
import { RetroCard } from "../../types/retroTypes";
import { useUserContext } from "../../../common/context/UserContext";
import CardActionButton from "./CardActionButton";

interface UpvoteItemButtonProps extends IconButtonProps {
  card: RetroCard;
  columnIndex: number;
}

export default function UpvoteCardButton({ columnIndex, card, ...props }: UpvoteItemButtonProps) {
  const { handleUpvoteCard } = useRetroContext();
  const { user } = useUserContext();
  const votesLeft = useVotesLeft();

  function handleUpvote() {
    if (votesLeft === 0) return;
    handleUpvoteCard({ columnIndex, cardIndex: card.index, userId: user.id });
  }

  return (
    <CardActionButton {...props} onClick={handleUpvote} tooltipText="Upvote Card">
      <ThumbUp />
    </CardActionButton>
  );
}
