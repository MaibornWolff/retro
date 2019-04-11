import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import {
  withMobileDialog,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography
} from "@material-ui/core";

import { EDIT_COLUMN } from "../../events/event-names";
import { socket_connect, validateInput } from "../../utils";
import {
  COLUMN_NAME_EMPTY_MSG,
  COLUMN_NAME_TOO_LONG_MSG
} from "../../utils/errorMessages";

class EditColumnNameDialog extends React.Component {
  state = { open: false, title: this.props.columnTitle };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  handleClick = () => {
    const { title } = this.state;
    const { columnId, boardId } = this.props;
    const socket = socket_connect(boardId);

    socket.emit(EDIT_COLUMN, columnId, boardId, title);
    this.setState({ open: false, title: "" });
  };

  handleChange = e => this.setState({ title: e.target.value });

  renderError(isNameEmpty, isNameLong) {
    if (isNameEmpty || isNameLong) {
      return (
        <Typography variant="caption" color="error">
          {isNameEmpty ? COLUMN_NAME_EMPTY_MSG : COLUMN_NAME_TOO_LONG_MSG}
        </Typography>
      );
    }

    return null;
  }

  render() {
    const { open, title } = this.state;
    const { fullScreen } = this.props;
    const input = validateInput(title.length, 0, 20);

    return (
      <>
        <MenuItem button onClick={this.handleOpen}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText inset primary="Edit Name" />
        </MenuItem>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={this.handleClose}
          aria-labelledby="edit-column-dialog"
        >
          <DialogTitle id="edit-column-dialog">Edit Column</DialogTitle>
          <DialogContent>
            <TextField
              required
              error={!input.isValid}
              margin="dense"
              label="Column Name"
              type="text"
              value={title}
              onChange={this.handleChange}
              helperText={this.renderError(input.isEmpty, input.isTooLong)}
              autoFocus
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
              disabled={!input.isValid}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withMobileDialog()(EditColumnNameDialog);
