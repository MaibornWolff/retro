import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
} from "@mui/material";
import { useUserContext } from "../../../common/context/UserContext";
import { usePokerContext } from "../../context/PokerContext";
import { useFullscreen } from "../../../retro/hooks/useFullscreen";
import { isModerator } from "../../../common/utils/participantsUtils";
import { RestartAlt } from "@mui/icons-material";

export function PokerResetButton() {
  const { user } = useUserContext();
  const [open, setOpen] = useState(false);
  const { handleResetUserStory, pokerState } = usePokerContext();
  const fullScreen = useFullscreen();
  const theme = useTheme();
  const noUserVoted = Object.keys(pokerState.votes).length === 0;

  function handleClick() {
    handleResetUserStory();
    setOpen(false);
  }

  if (!isModerator(user)) return null;

  return (
    <>
      <Button
        variant="contained"
        aria-label="Reset Votes"
        sx={{
          margin: theme.spacing(1),
          borderRadius: "10px",
          boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
        }}
        startIcon={<RestartAlt />}
        onClick={() => {
          setOpen(true);
        }}
        disabled={noUserVoted}
      >
        Reset Votes
      </Button>
      <Dialog
        fullWidth
        maxWidth="sm"
        fullScreen={fullScreen}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="poker-reset-dialog-title"
      >
        <DialogTitle id="poker-reset-dialog-title">Reset Votes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to reset all votes! Do you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            No
          </Button>
          <Button onClick={handleClick} color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
