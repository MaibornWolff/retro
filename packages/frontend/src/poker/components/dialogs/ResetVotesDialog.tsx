import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DialogProps } from "../../../common/types/commonTypes";
import { useFullscreen } from "../../../retro/hooks/useFullscreen";
import { usePokerContext } from "../../context/PokerContext";
import { CallToActionButton } from "../../../common/components/buttons/CallToActionButton";

export function ResetVotesDialog({ isOpen, close }: DialogProps) {
  const { handleResetUserStory } = usePokerContext();
  const fullScreen = useFullscreen();

  function handleClick() {
    handleResetUserStory();
    close();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreen}
      open={isOpen}
      onClose={close}
      aria-labelledby="poker-reset-dialog-title"
    >
      <DialogTitle id="poker-reset-dialog-title">Reset Votes</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You are about to reset all votes! Do you want to proceed?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>No</Button>
        <CallToActionButton onClick={handleClick}>Yes</CallToActionButton>
      </DialogActions>
    </Dialog>
  );
}
