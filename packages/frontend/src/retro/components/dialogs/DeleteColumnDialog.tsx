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

interface DeleteColumnDialogProps extends DialogProps {
  columnIndex: number;
}

export function DeleteColumnDialog({ isOpen, close, columnIndex }: DeleteColumnDialogProps) {
  const { handleDeleteColumn } = useRetroContext();
  const fullScreen = useFullscreen();

  function handleClick() {
    handleDeleteColumn(columnIndex);
    close();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      open={isOpen}
      onClose={close}
      aria-labelledby="alert-delete-column-dialog"
      aria-describedby="alert-delete-column-dialog-description"
    >
      <DialogTitle id="alert-delete-column-dialog">{"Delete this column?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-delete-column-dialog-description">
          You are about to delete this column!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button aria-label="Cancel" onClick={close}>
          Cancel
        </Button>
        <Button aria-label="Delete" onClick={handleClick} color="error" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
