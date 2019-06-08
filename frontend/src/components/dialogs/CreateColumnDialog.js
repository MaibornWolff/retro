import React, { useState, useContext } from "react";
import nanoid from "nanoid";
import AddIcon from "@material-ui/icons/Add";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  withMobileDialog
} from "@material-ui/core";

import { CREATE_COLUMN } from "../../utils/eventNames";
import { connectSocket, validateInput } from "../../utils";
import { ROLE_MODERATOR } from "../../utils/userUtils";
import {
  COLUMN_NAME_EMPTY_MSG,
  COLUMN_NAME_TOO_LONG_MSG
} from "../../utils/errorMessages";
import { BoardContext } from "../context/BoardContext";
import { UserContext } from "../context/UserContext";

function CreateColumnDialog(props) {
  const { fullScreen } = props;
  const [open, setOpen] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");
  const boardId = useContext(BoardContext);
  const { userState } = useContext(UserContext);
  const input = validateInput(columnTitle.length, 0, 40);

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function handleChange(event) {
    setColumnTitle(event.target.value);
  }

  function resetState() {
    setOpen(false);
    setColumnTitle("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const id = nanoid();
    const socket = connectSocket(boardId);
    const column = { id, columnTitle, itemIds: [] };

    socket.emit(CREATE_COLUMN, column, boardId);
    resetState();
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
      <Button
        size="small"
        variant="outlined"
        aria-label="Add Column"
        color="primary"
        onClick={openDialog}
        data-testid="new-col-btn"
        disabled={userState.role !== ROLE_MODERATOR}
      >
        <AddIcon />
        New Column
      </Button>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        maxWidth="xs"
        open={open}
        onClose={closeDialog}
        aria-labelledby="new-column-dialog"
      >
        <DialogTitle id="new-column-dialog">Create New Column</DialogTitle>
        <DialogContent>
          <TextField
            required
            error={!input.isValid}
            autoFocus
            margin="dense"
            id="column-name"
            label="Column Name"
            type="text"
            value={columnTitle}
            onChange={handleChange}
            helperText={renderError()}
            fullWidth
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={!input.isValid}
            data-testid="create-column-btn"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withMobileDialog()(CreateColumnDialog);
