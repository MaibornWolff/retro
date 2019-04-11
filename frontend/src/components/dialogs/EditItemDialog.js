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
  Tooltip
} from "@material-ui/core";

import { socket_connect } from "../../utils";
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
    const { author, content } = this.state;
    const { id, boardId } = this.props;
    const socket = socket_connect(boardId);
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

  render() {
    const { open, author, content } = this.state;
    const { fullScreen } = this.props;
    const isValidAuthor = author.length > 0 && author.length <= 30;
    const isValidContent = content.length > 0;

    return (
      <>
        <Tooltip title="Edit Card" aria-label="Edit Card">
          <IconButton
            color="primary"
            onClick={this.handleOpen}
            data-testid="edit-item-btn"
          >
            <EditIcon fontSize="small" data-testid="edit-item-btn-icon" />
          </IconButton>
        </Tooltip>
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
              error={!isValidAuthor}
              margin="dense"
              id="author-name"
              label="Author"
              type="text"
              value={author}
              onChange={this.handleAuthorChange}
              autoFocus
              fullWidth
              autoComplete="off"
            />
            <TextField
              required
              error={!isValidContent}
              margin="dense"
              id="content-name"
              label="Content"
              type="text"
              value={content}
              onChange={this.handleContentChange}
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
              disabled={!isValidAuthor || !isValidContent}
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
