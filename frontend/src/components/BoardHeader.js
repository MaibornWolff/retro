import React from "react";
import io from "socket.io-client";
import uniqid from "uniqid";
import AddIcon from "@material-ui/icons/Add";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withStyles
} from "@material-ui/core";

import { CREATE_COLUMN } from "../events/event-names";
import { LOCAL_BACKEND_ENDPOINT } from "../utils";

class BoardHeader extends React.Component {
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
    const { classes, title } = this.props;

    return (
      <>
        <Grid item>
          <Typography variant="h6">{title}</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={this.handleOpen}>
            New Column
            <AddIcon className={classes.rightIcon} />
          </Button>
          <Dialog
            open={open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Create New Column</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please provide a name for your new column.
              </DialogContentText>
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
              <Button onClick={this.handleSubmit} color="primary">
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

export default withStyles(styles)(BoardHeader);
