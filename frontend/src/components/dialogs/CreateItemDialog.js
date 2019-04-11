import React from "react";
import uniqid from "uniqid";
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
  Tooltip
} from "@material-ui/core";

import { socket_connect } from "../../utils";
import { CREATE_CARD } from "../../events/event-names";

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
    const id = uniqid("item-");
    const newCard = {
      id,
      author,
      content,
      points: 0
    };
    socket.emit(CREATE_CARD, newCard, columnId, boardId);
    this.setState({ author: "", content: "", open: false });
  };

  render() {
    const { open, author, content } = this.state;
    const { fullScreen } = this.props;
    const isValidAuthor = author.length > 0 && author.length <= 30;
    const isValidContent = content.length > 0;

    return (
      <>
        <Tooltip title="New Card" aria-label="New Card">
          <IconButton
            color="inherit"
            onClick={this.handleOpen}
            data-testid="new-item-btn"
          >
            <AddIcon fontSize="small" data-testid="new-item-btn-icon" />
          </IconButton>
        </Tooltip>
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
              error={!isValidAuthor}
              autoFocus
              margin="dense"
              id="author-name"
              label="Author"
              type="text"
              value={author}
              onChange={this.handleAuthorChange}
              fullWidth
              autoComplete="off"
            />
            <TextField
              required
              error={!isValidContent}
              margin="dense"
              multiline
              id="content-name"
              label="Content"
              type="text"
              value={content}
              onChange={this.handleContentChange}
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
              disabled={!isValidAuthor || !isValidContent}
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
