import React, { useContext } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  withMobileDialog
} from "@material-ui/core";

import { DELETE_COLUMN } from "../../constants/eventNames";
import { BoardContext } from "../../context/BoardContext";

function DeleteColumnDialog(props) {
  const { isOpen, closeDialog, columnId, fullScreen } = props;
  const { boardId, socket } = useContext(BoardContext);

  function handleClick() {
    socket.emit(DELETE_COLUMN, columnId, boardId);
    closeDialog();
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={closeDialog}
      aria-labelledby="alert-delete-column-dialog"
      aria-describedby="alert-delete-column-dialog-description"
    >
      <DialogTitle id="alert-delete-column-dialog">
        {"Delete this column?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-delete-column-dialog-description">
          You are about to delete this column. If you are sure, then click on
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
  );
}

export default withMobileDialog()(DeleteColumnDialog);
