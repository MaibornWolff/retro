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
  Button,
  withMobileDialog,
  Tooltip
} from "@material-ui/core";

import { BACKEND_ENDPOINT } from "../../utils";
import { DELETE_COLUMN } from "../../events/event-names";

class DeleteColumnDialog extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  handleDeleteClick = () => {
    const socket = io(BACKEND_ENDPOINT);
    const { columnId, boardId } = this.props;

    socket.emit(DELETE_COLUMN, columnId, boardId);
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const { fullScreen } = this.props;

    return (
      <>
        <Tooltip title="Delete Column" aria-label="Delete Column">
          <IconButton
            color="inherit"
            onClick={this.handleOpen}
            data-testid="delete-col-btn"
          >
            <DeleteIcon fontSize="small" data-testid="delete-col-btn-icon" />
          </IconButton>
        </Tooltip>
        <Dialog
          fullScreen={fullScreen}
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
            <Button onClick={this.handleDeleteClick} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withMobileDialog()(DeleteColumnDialog);
