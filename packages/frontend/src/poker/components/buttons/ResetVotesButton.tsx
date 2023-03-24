import React from "react";
import { Button, useTheme } from "@mui/material";
import { useUserContext } from "../../../common/context/UserContext";
import { usePokerContext } from "../../context/PokerContext";
import { isModerator } from "../../../common/utils/participantsUtils";
import { ResetVotesDialog } from "../dialogs/ResetVotesDialog";
import { useDialog } from "../../../common/hooks/useDialog";

export function ResetVotesButton() {
  const { user } = useUserContext();
  const { isOpen, closeDialog, openDialog } = useDialog(false);
  const { pokerState } = usePokerContext();
  const theme = useTheme();
  const noUserVoted = Object.keys(pokerState.votes).length === 0;

  if (!isModerator(user)) return null;

  return (
    <>
      <Button
        color="primary"
        variant="outlined"
        aria-label="Reset Votes"
        sx={{ margin: theme.spacing(1) }}
        onClick={openDialog}
        disabled={noUserVoted}
      >
        Reset Votes
      </Button>
      <ResetVotesDialog isOpen={isOpen} close={closeDialog} />
    </>
  );
}
