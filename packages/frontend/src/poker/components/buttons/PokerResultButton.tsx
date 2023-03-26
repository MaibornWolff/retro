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
      variant="contained"
      aria-label="Show Results"
      sx={{
        margin: theme.spacing(1),
        borderRadius: "10px",
        boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
      }}
      disabled={noUserVoted}
      onClick={handleClick}
      startIcon={<Visibility />}
    >
      Show Results
    </Button>
  );
}
