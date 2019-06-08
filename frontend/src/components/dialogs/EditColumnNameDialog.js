import React, { useState, useContext } from "react";
import EditIcon from "@material-ui/icons/Edit";
import {
  withMobileDialog,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography
} from "@material-ui/core";

import { EDIT_COLUMN } from "../../utils/eventNames";
import { connectSocket, validateInput } from "../../utils";
import {
  COLUMN_NAME_EMPTY_MSG,
  COLUMN_NAME_TOO_LONG_MSG
} from "../../utils/errorMessages";
import { BoardContext } from "../context/BoardContext";

function EditColumnNameDialog(props) {
  const { columnId, columnTitle, fullScreen } = props;
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(columnTitle);
  const boardId = useContext(BoardContext);
  const input = validateInput(title.length, 0, 40);

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function resetState() {
    setOpen(false);
    setTitle("");
  }

  function handleClick() {
    const socket = connectSocket(boardId);
    socket.emit(EDIT_COLUMN, columnId, boardId, title);
    resetState();
  }

  function handleChange(event) {
    setTitle(event.target.value);
  }

  function renderError() {
    const { isEmpty, isTooLong } = input;
    if (isEmpty || isTooLong) {
      return (
        <Typography variant="caption" color="error">
          {isEmpty ? COLUMN_NAME_EMPTY_MSG : COLUMN_NAME_TOO_LONG_MSG}
        </Typography>
      );
    }

    return null;
  }

  return (
    <>
      <MenuItem button onClick={openDialog}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText inset primary="Edit Name" />
      </MenuItem>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={closeDialog}
        aria-labelledby="edit-column-dialog"
      >
        <DialogTitle id="edit-column-dialog">Edit Column</DialogTitle>
        <DialogContent>
          <TextField
            required
            error={!input.isValid}
            margin="dense"
            label="Column Name"
            type="text"
            value={title}
            onChange={handleChange}
            helperText={renderError()}
            autoFocus
            fullWidth
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleClick}
            color="primary"
            disabled={!input.isValid}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withMobileDialog()(EditColumnNameDialog);
