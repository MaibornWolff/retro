import React, { useState, useContext } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  withMobileDialog,
  MenuItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";

import { DELETE_COLUMN } from "../../utils/eventNames";
import { BoardContext } from "../context/BoardContext";

function DeleteColumnDialog(props) {
  const { columnId, fullScreen } = props;
  const [open, setOpen] = useState(false);
  const { boardId, socket } = useContext(BoardContext);

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function handleClick() {
    socket.emit(DELETE_COLUMN, columnId, boardId);
    closeDialog();
  }

  return (
    <>
      <MenuItem button onClick={openDialog} data-testid="delete-col-btn">
        <ListItemIcon>
          <DeleteIcon fontSize="small" data-testid="delete-col-btn-icon" />
        </ListItemIcon>
        <ListItemText inset primary="Delete Column" />
      </MenuItem>
      <Dialog
        fullScreen={fullScreen}
        open={open}
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
    </>
  );
}

export default withMobileDialog()(DeleteColumnDialog);
