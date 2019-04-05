import React from "react";
import uniqid from "uniqid";
import AddIcon from "@material-ui/icons/Add";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog,
  FormControl
} from "@material-ui/core";

import { socket_connect } from "../../utils";
import { CREATE_COLUMN } from "../../events/event-names";

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

    const id = uniqid("column-");
    const { columnTitle } = this.state;

    const { boardId } = this.props;
    const socket = socket_connect(boardId);
    const column = { id, columnTitle, itemIds: [] };

    socket.emit(CREATE_COLUMN, column, boardId);
    this.setState({ columnTitle: "", open: false });
  };

  render() {
    const { open, columnTitle } = this.state;
    const { fullScreen } = this.props;
    const isSubmitEnabled = columnTitle.length > 0 && columnTitle.length <= 20;

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
        <FormControl>
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
                error={!isSubmitEnabled}
                autoFocus
                margin="dense"
                id="column-name"
                label="Column Name"
                type="text"
                value={columnTitle}
                onChange={this.handleChange}
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
                disabled={!isSubmitEnabled}
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </FormControl>
      </>
    );
  }
}

export default withMobileDialog()(CreateColumnDialog);
