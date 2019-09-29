import React, { useState, useContext, useEffect } from "react";
import {
  withMobileDialog,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography
} from "@material-ui/core";

import { BoardContext } from "../../context/BoardContext";
import { DialogsContext } from "../../context/DialogsContext";
import { validateInput } from "../../utils";
import { EDIT_COLUMN } from "../../constants/eventNames";
import { COLUMN_NAME_TOO_LONG_MSG } from "../../constants/errorMessages";

function EditColumnDialog(props) {
  const { fullScreen } = props;

  const [title, setTitle] = useState("");
  const { boardId, socket } = useContext(BoardContext);
  const { dialogsState, closeEditColumnDialog } = useContext(DialogsContext);

  useEffect(() => {
    setTitle(dialogsState.columnTitle);
  }, [dialogsState.columnTitle]);

  const input = validateInput(title.length, 0, 40);

  function handleClick() {
    socket.emit(EDIT_COLUMN, dialogsState.columnId, boardId, title);
    closeEditColumnDialog();
  }

  function handleChange(event) {
    setTitle(event.target.value);
  }

  function renderError() {
    if (input.isTooLong) {
      return (
        <Typography variant="caption" color="error">
          {COLUMN_NAME_TOO_LONG_MSG}
        </Typography>
      );
    }

    return null;
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      open={dialogsState.isEditColumnDialogOpen}
      onClose={closeEditColumnDialog}
      aria-labelledby="edit-column-dialog"
    >
      <DialogTitle id="edit-column-dialog">Edit Column</DialogTitle>
      <DialogContent>
        <TextField
          required
          autoFocus
          fullWidth
          value={title}
          onChange={handleChange}
          error={input.isTooLong}
          helperText={renderError()}
          id="col-name-input-edit"
          label="Column Name"
          type="text"
          margin="dense"
          autoComplete="off"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeEditColumnDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClick} color="primary" disabled={!input.isValid}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withMobileDialog()(EditColumnDialog);
