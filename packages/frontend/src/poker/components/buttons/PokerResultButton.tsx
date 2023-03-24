import React from "react";
import { Button, useTheme } from "@mui/material";
import { useUserContext } from "../../../common/context/UserContext";
import { usePokerContext } from "../../context/PokerContext";
import { isModerator } from "../../../common/utils/participantsUtils";
import { Visibility } from "@mui/icons-material";

export function PokerResultButton() {
  const theme = useTheme();
  const { user } = useUserContext();
  const { handleShowPokerResults, pokerState } = usePokerContext();
  const noUserVoted = Object.keys(pokerState.votes).length === 0;

  if (!isModerator(user)) return null;

  function handleClick() {
    handleShowPokerResults();
  }

  return (
    <Button
      variant="outlined"
      aria-label="Show Results"
      sx={{ margin: theme.spacing(1), borderRadius: "10px" }}
      disabled={noUserVoted}
      onClick={handleClick}
      startIcon={<Visibility />}
    >
      Show Results
    </Button>
  );
}
