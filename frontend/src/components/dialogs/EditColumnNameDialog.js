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

import { validateInput } from "../../utils";
import { BoardContext } from "../../context/BoardContext";
import { EDIT_COLUMN } from "../../constants/eventNames";
import { EDIT_COLUMN_NAME_BUTTON } from "../../constants/testIds";
import {
  COLUMN_NAME_EMPTY_MSG,
  COLUMN_NAME_TOO_LONG_MSG
} from "../../constants/errorMessages";

function EditColumnNameDialog(props) {
  const { columnId, columnTitle, fullScreen } = props;
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(columnTitle);
  const { boardId, socket } = useContext(BoardContext);
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
      <MenuItem
        button
        onClick={openDialog}
        data-testid={EDIT_COLUMN_NAME_BUTTON}
      >
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
            id="col-name-input-edit"
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
