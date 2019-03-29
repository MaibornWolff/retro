import React from "react";
import io from "socket.io-client";
import EditIcon from "@material-ui/icons/Edit";
import {
  withMobileDialog,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@material-ui/core";

import { BACKEND_ENDPOINT } from "../../utils";
import { EDIT_COLUMN } from "../../events/event-names";

class EditColumnNameDialog extends React.Component {
  state = { open: false, title: this.props.columnTitle };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  handleClick = () => {
    const socket = io(BACKEND_ENDPOINT);
    const { title } = this.state;
    const { columnId, boardId } = this.props;

    socket.emit(EDIT_COLUMN, columnId, boardId, title);
    this.setState({ open: false, title: "" });
  };

  handleChange = e => this.setState({ title: e.target.value });

  render() {
    const { open, title } = this.state;
    const { fullScreen } = this.props;

    return (
      <>
        <Tooltip title="Edit Column" aria-label="Edit Column">
          <IconButton color="inherit" onClick={this.handleOpen}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={this.handleClose}
          aria-labelledby="edit-column-dialog"
        >
          <DialogTitle id="edit-column-dialog">Edit Column</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Column Name"
              type="text"
              value={title}
              onChange={this.handleChange}
              autoFocus
              fullWidth
              autoComplete="off"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClick} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withMobileDialog()(EditColumnNameDialog);
