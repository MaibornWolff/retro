import React from "react";
import { Forum } from "@mui/icons-material";
import { IconButtonProps } from "@mui/material";
import { RetroCard } from "../../types/retroTypes";
import { useRetroContext } from "../../context/RetroContext";
import { useUserContext } from "../../../common/context/UserContext";
import CardActionButton from "./CardActionButton";

interface MarkItemAsDiscussedButtonProps extends IconButtonProps {
  card: RetroCard;
  columnIndex: number;
}

export default function MarkAsDiscussedButton({
  card,
  columnIndex,
  ...props
}: MarkItemAsDiscussedButtonProps) {
  const { user } = useUserContext();
  const { handleToggleCardDiscussed } = useRetroContext();

  const isModerator = user.role === "moderator";
  if (!isModerator) return null;

  function handleClick() {
    if (!isModerator) return;
    handleToggleCardDiscussed({ cardIndex: card.index, columnIndex });
  }

  return (
    <CardActionButton
      {...props}
      tooltipText={"Mark as discussed"}
      onClick={handleClick}
      disabled={(props.disabled ?? false) || !isModerator}
    >
      <Forum />
    </CardActionButton>
  );
}
