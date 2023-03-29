import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useRetroContext } from "../../context/RetroContext";
import { DialogProps } from "../../../common/types/commonTypes";
import { useFullscreen } from "../../hooks/useFullscreen";

interface DeleteCardDialogProps extends DialogProps {
  columnIndex: number;
  cardIndex: number;
}

export function DeleteCardDialog({ isOpen, close, columnIndex, cardIndex }: DeleteCardDialogProps) {
  const { handleDeleteCard } = useRetroContext();
  const fullScreen = useFullscreen();

  function handleClick() {
    handleDeleteCard({ cardIndex, columnIndex });
    close();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      open={isOpen}
      onClose={close}
      aria-labelledby="alert-delete-card-dialog"
      aria-describedby="alert-delete-card-dialog-description"
    >
      <DialogTitle id="alert-delete-card-dialog">{"Delete this card?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-delete-card-dialog-description">
          You are about to delete this card!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={handleClick} color="error" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
