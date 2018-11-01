import React from "react";
import io from "socket.io-client";
import uniqid from "uniqid";
import AddIcon from "@material-ui/icons/Add";
import { navigate } from "@reach/router";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withStyles
} from "@material-ui/core";

import { CREATE_BOARD } from "../events/event-names";
import { LOCAL_BACKEND_ENDPOINT } from "../utils";
import { emptyBoard } from "../utils/emptyBoard";

class CreateBoardButton extends React.Component {
  state = {
    open: false,
    title: ""
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false, title: "" });

  handleChange = e => this.setState({ title: e.target.value });

  handleSubmit = async e => {
    e.preventDefault();
    const socket = io(LOCAL_BACKEND_ENDPOINT);
    const { title } = this.state;
    const boardId = uniqid("board-");
    const newBoard = { ...emptyBoard, boardId, title };

    socket.emit(CREATE_BOARD, newBoard, boardId);
    this.setState({ title: "", open: false });
    await navigate(`boards/${boardId}`);
  };

  render() {
    const { open, title } = this.state;
    const { classes } = this.props;

    return (
      <>
        <Button variant="contained" color="primary" onClick={this.handleOpen}>
          New Board
          <AddIcon className={classes.rightIcon} />
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create New Board</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please provide a name for your new board.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="board-name"
              label="Board Name"
              type="text"
              value={title}
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
      </>
    );
  }
}

const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

export default withStyles(styles)(CreateBoardButton);
