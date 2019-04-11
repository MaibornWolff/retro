import React from "react";
import nanoid from "nanoid";
import AddIcon from "@material-ui/icons/Add";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  withMobileDialog
} from "@material-ui/core";

import { CREATE_COLUMN } from "../../events/event-names";
import { socket_connect, validateInput } from "../../utils";
import {
  COLUMN_NAME_EMPTY_MSG,
  COLUMN_NAME_TOO_LONG_MSG
} from "../../utils/errorMessages";

class CreateColumnDialog extends React.Component {
  state = {
    open: false,
    columnTitle: ""
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  handleChange = event => {
    this.setState({ columnTitle: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const id = nanoid();
    const { columnTitle } = this.state;

    const { boardId } = this.props;
    const socket = socket_connect(boardId);
    const column = { id, columnTitle, itemIds: [] };

    socket.emit(CREATE_COLUMN, column, boardId);
    this.setState({ columnTitle: "", open: false });
  };

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
    const { open, columnTitle } = this.state;
    const { fullScreen } = this.props;
    const input = validateInput(columnTitle.length, 0, 20);

    return (
      <>
        <Button
          size="small"
          variant="outlined"
          aria-label="Add Column"
          color="primary"
          onClick={this.handleOpen}
          data-testid="new-col-btn"
        >
          <AddIcon />
          New Column
        </Button>
        <Dialog
          fullScreen={fullScreen}
          fullWidth={true}
          maxWidth="xs"
          open={open}
          onClose={this.handleClose}
          aria-labelledby="new-column-dialog"
        >
          <DialogTitle id="new-column-dialog">Create New Column</DialogTitle>
          <DialogContent>
            <TextField
              required
              error={!input.isValid}
              autoFocus
              margin="dense"
              id="column-name"
              label="Column Name"
              type="text"
              value={columnTitle}
              onChange={this.handleChange}
              helperText={this.renderError(input.isEmpty, input.isTooLong)}
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
              disabled={!input.isValid}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withMobileDialog()(CreateColumnDialog);
