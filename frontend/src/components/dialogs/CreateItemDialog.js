import React from "react";
import nanoid from "nanoid";
import AddIcon from "@material-ui/icons/Add";
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

import { CREATE_CARD } from "../../events/event-names";
import { socket_connect, validateInput, isInputEmpty } from "../../utils";
import {
  CARD_AUTHOR_NAME_EMPTY_MSG,
  CARD_AUTHOR_NAME_TOO_LONG_MSG,
  CARD_CONTENT_EMPTY_MSG
} from "../../utils/errorMessages";

class CreateItemDialog extends React.Component {
  state = {
    open: false,
    author: "",
    content: ""
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  handleAuthorChange = e => this.setState({ author: e.target.value });

  handleContentChange = e => this.setState({ content: e.target.value });

  handleSubmit = e => {
    e.preventDefault();

    const { author, content } = this.state;
    const { columnId, boardId } = this.props;
    const socket = socket_connect(boardId);
    const id = nanoid();
    const newCard = {
      id,
      author,
      content,
      points: 0
    };
    socket.emit(CREATE_CARD, newCard, columnId, boardId);
    this.setState({ author: "", content: "", open: false });
  };

  renderAuthorError(isAuthorEmpty, isAuthorLong) {
    if (isAuthorEmpty || isAuthorLong) {
      return (
        <Typography variant="caption" color="error">
          {isAuthorEmpty
            ? CARD_AUTHOR_NAME_EMPTY_MSG
            : CARD_AUTHOR_NAME_TOO_LONG_MSG}
        </Typography>
      );
    }

    return null;
  }

  renderContentError(isContentEmpty) {
    if (isContentEmpty) {
      return (
        <Typography variant="caption" color="error">
          {isContentEmpty ? CARD_CONTENT_EMPTY_MSG : null}
        </Typography>
      );
    }

    return null;
  }

  render() {
    const { open, author, content } = this.state;
    const { fullScreen } = this.props;
    const authorInput = validateInput(author.length, 0, 30);
    const isContentEmpty = isInputEmpty(content.length);

    return (
      <>
        <IconButton
          color="inherit"
          onClick={this.handleOpen}
          data-testid="new-item-btn"
        >
          <AddIcon fontSize="small" data-testid="new-item-btn-icon" />
        </IconButton>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={this.handleClose}
          aria-labelledby="new-card-dialog"
        >
          <DialogTitle id="new-card-dialog">New Card</DialogTitle>
          <DialogContent>
            <TextField
              required
              error={!authorInput.isValid}
              autoFocus
              margin="dense"
              id="author-name"
              label="Author"
              type="text"
              value={author}
              onChange={this.handleAuthorChange}
              helperText={this.renderAuthorError(
                authorInput.isEmpty,
                authorInput.isTooLong
              )}
              fullWidth
              autoComplete="off"
            />
            <TextField
              required
              error={isContentEmpty}
              margin="dense"
              multiline
              id="content-name"
              label="Content"
              type="text"
              value={content}
              onChange={this.handleContentChange}
              helperText={this.renderContentError(isContentEmpty)}
              fullWidth
              autoComplete="off"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.handleSubmit}
              color="primary"
              disabled={!authorInput.isValid || isContentEmpty}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withMobileDialog()(CreateItemDialog);
