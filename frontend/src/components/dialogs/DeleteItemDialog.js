import React, { useState, useContext } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  withMobileDialog
} from "@material-ui/core";

import { connectSocket } from "../../utils";
import { DELETE_CARD } from "../../utils/eventNames";
import { BoardContext } from "../context/BoardContext";

function DeleteItemDialog(props) {
  const { id, fullScreen } = props;
  const [open, setOpen] = useState(false);
  const boardId = useContext(BoardContext);

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function handleClick() {
    const socket = connectSocket(boardId);
    socket.emit(DELETE_CARD, id, boardId);
    closeDialog();
  }

  return (
    <>
      <IconButton
        color="primary"
        onClick={openDialog}
        data-testid="delete-item-btn"
      >
        <DeleteIcon fontSize="small" data-testid="delete-item-btn-icon" />
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={closeDialog}
        aria-labelledby="alert-delete-card-dialog"
        aria-describedby="alert-delete-card-dialog-description"
      >
        <DialogTitle id="alert-delete-card-dialog">
          {"Delete this card?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-delete-card-dialog-description">
            You are about to delete this card. If you are sure, then click on
            the delete button.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClick} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withMobileDialog()(DeleteItemDialog);
