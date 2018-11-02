import React from "react";
import io from "socket.io-client";
import uniqid from "uniqid";
import AddIcon from "@material-ui/icons/Add";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog
} from "@material-ui/core";

import { CREATE_COLUMN } from "../../events/event-names";
import { LOCAL_BACKEND_ENDPOINT } from "../../utils";

class CreateColumnDialog extends React.Component {
  state = {
    open: false,
    columnTitle: ""
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  handleChange = e => this.setState({ columnTitle: e.target.value });

  handleSubmit = e => {
    e.preventDefault();

    const socket = io(LOCAL_BACKEND_ENDPOINT);
    const id = uniqid("column-");
    const { columnTitle } = this.state;
    const { boardId } = this.props;
    const column = { id, columnTitle, itemIds: [] };

    socket.emit(CREATE_COLUMN, column, boardId);
    this.setState({ columnTitle: "", open: false });
  };

  render() {
    const { open, columnTitle } = this.state;
    const { fullScreen } = this.props;

    return (
      <>
        <Button
          variant="outlined"
          aria-label="Add Column"
          color="secondary"
          onClick={this.handleOpen}
        >
          New Column
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={this.handleClose}
          aria-labelledby="new-column-dialog"
        >
          <DialogTitle id="new-column-dialog">Create New Column</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="column-name"
              label="Column Name"
              type="text"
              value={columnTitle}
              onChange={this.handleChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="secondary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withMobileDialog()(CreateColumnDialog);
