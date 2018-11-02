import React from "react";
import io from "socket.io-client";
import EditIcon from "@material-ui/icons/Edit";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  withMobileDialog
} from "@material-ui/core";

import { LOCAL_BACKEND_ENDPOINT } from "../../utils";
import { EDIT_CARD } from "../../events/event-names";

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
    const socket = io(LOCAL_BACKEND_ENDPOINT);
    const { author, content } = this.state;
    const { id, boardId } = this.props;
    socket.emit(EDIT_CARD, author, content, id, boardId);

    this.setState({ open: false });
  };

  render() {
    const { open, author, content } = this.state;
    const { fullScreen } = this.props;

    return (
      <>
        <IconButton color="secondary" onClick={this.handleOpen}>
          <EditIcon fontSize="small" />
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
            <Button onClick={this.handleClick} color="secondary">
              Edit
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withMobileDialog()(EditItemDialog);
