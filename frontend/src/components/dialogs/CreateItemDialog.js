import React, { useState, useContext, useEffect } from "react";
import nanoid from "nanoid";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  withMobileDialog,
  Typography
} from "@material-ui/core";

import { BoardContext } from "../../context/BoardContext";
import { DialogsContext } from "../../context/DialogsContext";
import { validateInput, isInputEmpty } from "../../utils";
import { CREATE_CARD } from "../../constants/eventNames";
import {
  CARD_AUTHOR_NAME_EMPTY_MSG,
  CARD_AUTHOR_NAME_TOO_LONG_MSG,
  CARD_CONTENT_EMPTY_MSG
} from "../../constants/errorMessages";

function CreateItemDialog(props) {
  const { fullScreen } = props;

  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const { boardId, socket } = useContext(BoardContext);
  const { dialogsState, closeCreateItemDialog } = useContext(DialogsContext);

  useEffect(() => {
    setAuthor(dialogsState.itemAuthor);
    setContent(dialogsState.itemContent);
  }, [dialogsState.itemAuthor, dialogsState.itemContent]);

  const authorInput = validateInput(author.length, 0, 40);
  const isContentEmpty = isInputEmpty(content.length);

  function handleAuthorChange(event) {
    setAuthor(event.target.value);
  }

  function handleContentChange(event) {
    setContent(event.target.value);
  }

  function renderAuthorError() {
    const { isEmpty, isTooLong } = authorInput;

    if (isEmpty || isTooLong) {
      return (
        <Typography variant="caption" color="error">
          {isEmpty ? CARD_AUTHOR_NAME_EMPTY_MSG : CARD_AUTHOR_NAME_TOO_LONG_MSG}
        </Typography>
      );
    }

    return null;
  }

  function renderContentError() {
    if (isContentEmpty) {
      return (
        <Typography variant="caption" color="error">
          {isContentEmpty ? CARD_CONTENT_EMPTY_MSG : null}
        </Typography>
      );
    }

    return null;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const id = nanoid();
    const newCard = { id, author, content, points: 0 };

    socket.emit(CREATE_CARD, newCard, dialogsState.columnId, boardId);
    closeCreateItemDialog();
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={dialogsState.isCreateItemDialogOpen}
      onClose={closeCreateItemDialog}
      aria-labelledby="new-card-dialog"
    >
      <DialogTitle id="new-card-dialog">New Card</DialogTitle>
      <DialogContent>
        <TextField
          required
          error={!authorInput.isValid}
          margin="dense"
          id="author-name"
          label="Author"
          type="text"
          value={author}
          onChange={handleAuthorChange}
          helperText={renderAuthorError()}
          fullWidth
          autoComplete="off"
        />
        <TextField
          required
          autoFocus
          error={isContentEmpty}
          margin="dense"
          multiline
          id="content-name"
          label="Content"
          type="text"
          value={content}
          onChange={handleContentChange}
          helperText={renderContentError()}
          fullWidth
          autoComplete="off"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeCreateItemDialog} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={!authorInput.isValid || isContentEmpty}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withMobileDialog()(CreateItemDialog);
