import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  useTheme,
} from "@mui/material";
import { Casino } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFullscreen } from "../../retro/hooks/useFullscreen";

export function PlanningPokerDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const fullScreen = useFullscreen();

  function openDialog() {
    setIsOpen(true);
  }

  function closeDialog() {
    setIsOpen(false);
  }

  async function handleSubmit() {
    closeDialog();
    navigate(`/poker`);
  }

  return (
    <>
      <Fab
        size="large"
        variant="extended"
        onClick={openDialog}
        sx={{
          margin: theme.spacing(1),
          minWidth: "11rem",
        }}
      >
        <Casino
          sx={{
            marginRight: theme.spacing(1),
          }}
        />
        Planning Poker
      </Fab>
      <Dialog
        fullWidth
        maxWidth="xs"
        fullScreen={fullScreen}
        open={isOpen}
        onClose={closeDialog}
        aria-labelledby="planning-poker-dialog-title"
      >
        <DialogTitle id="planning-poker-dialog-title">Planning Poker Time!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to start a planning poker session. After clicking start you can share the
            link with your team in order to estimate stories.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleSubmit}>Start</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
