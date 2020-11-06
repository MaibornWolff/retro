import React, { useContext } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  useMediaQuery,
  useTheme,
  makeStyles,
} from "@material-ui/core";

import { DELETE_COLUMN } from "../../../constants/event.constants";
import { BoardContext } from "../../../context/BoardContext";
import { DialogsContext } from "../../../context/DialogContext";

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    color: theme.palette.error.main,
  },
}));

export default function DeleteColumnDialog() {
  const { boardId, socket } = useContext(BoardContext);
  const { dialogsState, closeDeleteColumnDialog } = useContext(DialogsContext);
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("sm"));
  const classes = useStyles();

  function handleClick() {
    socket.emit(DELETE_COLUMN, dialogsState.columnId, boardId);
    closeDeleteColumnDialog();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      open={dialogsState.isDeleteColumnDialogOpen}
      onClose={closeDeleteColumnDialog}
      aria-labelledby="alert-delete-column-dialog"
      aria-describedby="alert-delete-column-dialog-description"
    >
      <DialogTitle id="alert-delete-column-dialog">
        {"Delete this column?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-delete-column-dialog-description">
          You are about to delete this column!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDeleteColumnDialog} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleClick}
          className={classes.deleteButton}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
