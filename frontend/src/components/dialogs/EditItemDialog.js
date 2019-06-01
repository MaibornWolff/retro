import React, { useState, useContext, useEffect } from "react";
import EditIcon from "@material-ui/icons/Edit";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  withMobileDialog,
  Typography
} from "@material-ui/core";

import { EDIT_CARD } from "../../utils/eventNames";
import { connectSocket, validateInput, isInputEmpty } from "../../utils";
import { BoardContext } from "../context/BoardContext";
import {
  CARD_AUTHOR_NAME_EMPTY_MSG,
  CARD_AUTHOR_NAME_TOO_LONG_MSG,
  CARD_CONTENT_EMPTY_MSG
} from "../../utils/errorMessages";

function EditItemDialog(props) {
  const { id, author, content, fullScreen } = props;
  const [open, setOpen] = useState(false);
  const [itemAuthor, setAuthor] = useState(author);
  const [itemContent, setContent] = useState(content);
  const boardId = useContext(BoardContext);
  const authorInput = validateInput(itemAuthor.length, 0, 40);
  const isContentEmpty = isInputEmpty(itemContent.length);

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function handleAuthorChange(event) {
    setAuthor(event.target.value);
  }

  function handleContentChange(event) {
    setContent(event.target.value);
  }

  function handleClick() {
    const socket = connectSocket(boardId);
    socket.emit(EDIT_CARD, itemAuthor, itemContent, id, boardId);
    closeDialog();
  }

  useEffect(() => {
    setContent(content);
  }, [content]);

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

  return (
    <>
      <IconButton
        color="primary"
        onClick={openDialog}
        data-testid="edit-item-btn"
      >
        <EditIcon fontSize="small" data-testid="edit-item-btn-icon" />
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={closeDialog}
        aria-labelledby="edit-card-dialog"
      >
        <DialogTitle id="edit-card-dialog">Edit Card</DialogTitle>
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
            autoFocus
            fullWidth
            autoComplete="off"
          />
          <TextField
            required
            error={isContentEmpty}
            margin="dense"
            id="content-name"
            label="Content"
            type="text"
            value={content}
            onChange={handleContentChange}
            helperText={renderContentError()}
            rowsMax={Infinity}
            multiline
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
            disabled={!authorInput.isValid || isContentEmpty}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withMobileDialog()(EditItemDialog);
