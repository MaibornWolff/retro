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
import {
  COLUMN_NAME_EMPTY_MSG,
  COLUMN_NAME_TOO_LONG_MSG
} from "../../constants/errorMessages";

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
    <Dialog
      fullScreen={fullScreen}
      open={dialogsState.isEditColumnDialogOpen}
      onClose={closeEditColumnDialog}
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
