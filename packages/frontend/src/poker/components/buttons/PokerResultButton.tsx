import React from "react";
import { useUserContext } from "../../../common/context/UserContext";
import { usePokerContext } from "../../context/PokerContext";
import { isModerator } from "../../../common/utils/participantsUtils";
import { Visibility } from "@mui/icons-material";
import { ActionButton } from "../../../common/components/buttons/ActionButton";

export function PokerResultButton() {
  const { user } = useUserContext();
  const { handleShowPokerResults, pokerState } = usePokerContext();
  const noUserVoted = Object.keys(pokerState.votes).length === 0;

  if (!isModerator(user)) return null;

  function handleClick() {
    handleShowPokerResults();
  }

  return (
    <ActionButton
      aria-label="Show results"
      onClick={handleClick}
      label="Show results"
      isDisabled={noUserVoted}
      icon={<Visibility />}
    />
  );
}
