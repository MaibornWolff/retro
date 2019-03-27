import React from "react";
import io from "socket.io-client";
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

import { BACKEND_ENDPOINT } from "../../utils";
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

    const socket = io(BACKEND_ENDPOINT);
    const { author, content } = this.state;
    const { columnId, boardId } = this.props;
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
              autoFocus
              margin="dense"
              id="author-name"
              label="Author"
              type="text"
              value={author}
              onChange={this.handleAuthorChange}
              fullWidth
            />
            <TextField
              margin="dense"
              multiline
              id="content-name"
              label="Content"
              type="text"
              value={content}
              onChange={this.handleContentChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withMobileDialog()(CreateItemDialog);
