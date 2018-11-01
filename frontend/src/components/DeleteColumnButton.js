import React from "react";
import io from "socket.io-client";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@material-ui/core";

import { LOCAL_BACKEND_ENDPOINT } from "../utils";
import { DELETE_COLUMN } from "../events/event-names";

class DeleteColumnButton extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  handleDeleteClick = () => {
    const socket = io(LOCAL_BACKEND_ENDPOINT);
    const { columnId, boardId } = this.props;

    socket.emit(DELETE_COLUMN, columnId, boardId);
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;

    return (
      <>
        <IconButton color="secondary" onClick={this.handleOpen}>
          <DeleteIcon fontSize="small" />
        </IconButton>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-delete-column-dialog"
          aria-describedby="alert-delete-column-dialog-description"
        >
          <DialogTitle id="alert-delete-column-dialog">
            {"Delete this column?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-delete-column-dialog-description">
              You are about to delete this column. If you are sure, then click
              on the delete button.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.handleDeleteClick}
              color="secondary"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default DeleteColumnButton;
