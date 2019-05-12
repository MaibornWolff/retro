import React from "react";
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

import { EDIT_CARD } from "../../events/event-names";
import { connectSocket, validateInput, isInputEmpty } from "../../utils";
import {
  CARD_AUTHOR_NAME_EMPTY_MSG,
  CARD_AUTHOR_NAME_TOO_LONG_MSG,
  CARD_CONTENT_EMPTY_MSG
} from "../../utils/errorMessages";

class EditItemDialog extends React.Component {
  state = {
    open: false,
    author: this.props.author,
    content: this.props.content
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  handleAuthorChange = e => this.setState({ author: e.target.value });

  handleContentChange = e => this.setState({ content: e.target.value });

  handleClick = () => {
    const { author, content } = this.state;
    const { id, boardId } = this.props;
    const socket = connectSocket(boardId);
    socket.emit(EDIT_CARD, author, content, id, boardId);

    this.setState({ open: false });
  };

  componentDidUpdate(prevProps) {
    if (this.props.content !== prevProps.content) {
      this.setState({
        ...this.state,
        content: this.props.content
      });
    }
  }

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
    const authorInput = validateInput(author.length, 0, 40);
    const isContentEmpty = isInputEmpty(content.length);

    return (
      <>
        <IconButton
          color="primary"
          onClick={this.handleOpen}
          data-testid="edit-item-btn"
        >
          <EditIcon fontSize="small" data-testid="edit-item-btn-icon" />
        </IconButton>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={this.handleClose}
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
              onChange={this.handleAuthorChange}
              helperText={this.renderAuthorError(
                authorInput.isEmpty,
                authorInput.isTooLong
              )}
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
              onChange={this.handleContentChange}
              helperText={this.renderContentError(isContentEmpty)}
              rowsMax={Infinity}
              multiline
              fullWidth
              autoComplete="off"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.handleClick}
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
}

export default withMobileDialog()(EditItemDialog);
