import React from "react";
import { Forum } from "@mui/icons-material";
import { IconButtonProps } from "@mui/material";
import { RetroCard } from "../../types/retroTypes";
import { useRetroContext } from "../../context/RetroContext";
import { useUserContext } from "../../../common/context/UserContext";
import { CardActionButton } from "./CardActionButton";
import { isModerator } from "../../../common/utils/participantsUtils";

interface MarkItemAsDiscussedButtonProps extends IconButtonProps {
  card: RetroCard;
  columnIndex: number;
}

export function MarkAsDiscussedButton({
  card,
  columnIndex,
  ...props
}: MarkItemAsDiscussedButtonProps) {
  const { user } = useUserContext();
  const { handleToggleCardDiscussed } = useRetroContext();

  if (!isModerator(user)) return null;

  function handleClick() {
    if (!isModerator(user)) return;
    handleToggleCardDiscussed({ cardIndex: card.index, columnIndex });
  }

  return (
    <CardActionButton
      {...props}
      tooltipText="Mark as discussed"
      onClick={handleClick}
      disabled={(props.disabled ?? false) || !isModerator(user)}
    >
      <Forum />
    </CardActionButton>
  );
}
