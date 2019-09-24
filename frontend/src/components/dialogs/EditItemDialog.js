import React, { useState, useContext, useEffect } from "react";
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

import { DialogsContext } from "../../context/DialogsContext";
import { BoardContext } from "../../context/BoardContext";
import { validateInput, isInputEmpty } from "../../utils";
import { EDIT_CARD } from "../../constants/eventNames";
import {
  CARD_AUTHOR_NAME_EMPTY_MSG,
  CARD_AUTHOR_NAME_TOO_LONG_MSG,
  CARD_CONTENT_EMPTY_MSG
} from "../../constants/errorMessages";

function EditItemDialog(props) {
  const { fullScreen } = props;

  const [itemAuthor, setAuthor] = useState("");
  const [itemContent, setContent] = useState("");
  const { boardId, socket } = useContext(BoardContext);
  const { dialogsState, closeEditItemDialog } = useContext(DialogsContext);

  useEffect(() => {
    setAuthor(dialogsState.itemAuthor);
    setContent(dialogsState.itemContent);
  }, [dialogsState]);

  const authorInput = validateInput(itemAuthor.length, 0, 40);
  const isContentEmpty = isInputEmpty(itemContent.length);

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

  function handleClick() {
    socket.emit(
      EDIT_CARD,
      itemAuthor,
      itemContent,
      dialogsState.itemId,
      boardId
    );
    closeEditItemDialog();
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={dialogsState.isEditItemDialogOpen}
      onClose={closeEditItemDialog}
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
          value={itemAuthor}
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
          value={itemContent}
          onChange={handleContentChange}
          helperText={renderContentError()}
          rowsMax={Infinity}
          multiline
          fullWidth
          autoComplete="off"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeEditItemDialog} color="primary">
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
  );
}

export default withMobileDialog()(EditItemDialog);
