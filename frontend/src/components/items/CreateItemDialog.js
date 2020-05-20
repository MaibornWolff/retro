import React, { useState, useContext, useEffect } from "react";
import { nanoid } from "nanoid";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  withMobileDialog,
  Typography,
} from "@material-ui/core";

import { BoardContext } from "../../context/BoardContext";
import { DialogsContext } from "../../context/DialogsContext";
import { validateInput } from "../../utils";
import { CREATE_CARD } from "../../constants/eventNames";
import {
  CARD_AUTHOR_NAME_TOO_LONG_MSG,
  CARD_CONTENT_TOO_LONG_MSG,
} from "../../constants/errorMessages";

function CreateItemDialog(props) {
  const { fullScreen } = props;

  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const { boardId, socket } = useContext(BoardContext);
  const { dialogsState, closeCreateItemDialog } = useContext(DialogsContext);

  // get the username from localstorage, if set
  useEffect(() => {
    setAuthor(dialogsState.itemAuthor);
  }, [dialogsState.itemAuthor]);

  const authorInput = validateInput(author.length, 0, 40);
  const contentInput = validateInput(content.length, 0, 100000);

  function handleAuthorChange(event) {
    setAuthor(event.target.value);
  }

  function handleContentChange(event) {
    setContent(event.target.value);
  }

  function renderAuthorError() {
    if (authorInput.isTooLong) {
      return (
        <Typography variant="caption" color="error">
          {CARD_AUTHOR_NAME_TOO_LONG_MSG}
        </Typography>
      );
    }

    return null;
  }

  function renderContentError() {
    if (contentInput.isTooLong) {
      return (
        <Typography variant="caption" color="error">
          {CARD_CONTENT_TOO_LONG_MSG}
        </Typography>
      );
    }

    return null;
  }

  function handleClose() {
    setContent("");
    closeCreateItemDialog();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const id = nanoid();
    const newCard = { id, author, content, points: 0 };

    socket.emit(CREATE_CARD, newCard, dialogsState.columnId, boardId);
    handleClose();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      open={dialogsState.isCreateItemDialogOpen}
      onClose={handleClose}
      aria-labelledby="new-card-dialog"
    >
      <DialogTitle id="new-card-dialog">New Card</DialogTitle>
      <DialogContent>
        <TextField
          required
          fullWidth
          value={author}
          onChange={handleAuthorChange}
          error={authorInput.isTooLong}
          helperText={renderAuthorError()}
          id="author-name"
          label="Author"
          type="text"
          margin="dense"
          autoComplete="off"
        />
        <TextField
          required
          fullWidth
          multiline
          value={content}
          onChange={handleContentChange}
          error={contentInput.isTooLong}
          helperText={renderContentError()}
          rowsMax={Infinity}
          id="content-name"
          label="Content"
          type="text"
          margin="dense"
          autoComplete="off"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={!authorInput.isValid || !contentInput.isValid}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withMobileDialog()(CreateItemDialog);
