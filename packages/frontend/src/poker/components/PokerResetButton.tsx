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

import { usePokerContext } from "../context/PokerContext";
import { useUserContext } from "../../common/context/UserContext";
import { useFullscreen } from "../../retro/hooks/useFullscreen";

export default function PokerResetButton() {
  const { user } = useUserContext();
  const [open, setOpen] = useState(false);
  const { handleResetUserStory } = usePokerContext();
  const fullScreen = useFullscreen();
  const theme = useTheme();

  function handleClick() {
    handleResetUserStory();
    setOpen(false);
  }

  if (user.role !== "moderator") return null;

  return (
    <>
      <Button
        color="primary"
        variant="outlined"
        sx={{ margin: theme.spacing(1) }}
        onClick={() => {
          setOpen(true);
        }}
        disabled={user.role !== "moderator"}
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
            color="primary"
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
