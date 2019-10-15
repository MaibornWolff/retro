import React, { useContext } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  withMobileDialog
} from "@material-ui/core";

import { DELETE_CARD } from "../../constants/eventNames";
import { DialogsContext } from "../../context/DialogsContext";
import { BoardContext } from "../../context/BoardContext";

function DeleteItemDialog(props) {
  const { fullScreen } = props;
  const { boardId, socket } = useContext(BoardContext);
  const { dialogsState, closeDeleteItemDialog } = useContext(DialogsContext);

  function handleClick() {
    socket.emit(DELETE_CARD, dialogsState.itemId, boardId);
    closeDeleteItemDialog();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      open={dialogsState.isDeleteItemDialogOpen}
      onClose={closeDeleteItemDialog}
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
        <Button onClick={closeDeleteItemDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClick} color="primary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withMobileDialog()(DeleteItemDialog);
