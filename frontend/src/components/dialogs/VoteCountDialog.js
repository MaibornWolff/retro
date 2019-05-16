import React from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ArrowUpIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownIcon from "@material-ui/icons/ArrowDownward";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  withMobileDialog,
  Grid,
  Typography,
  Snackbar
} from "@material-ui/core";

import { connectSocket } from "../../utils";
import { SET_MAX_VOTES } from "../../utils/eventNames";
import { isModerator, setUser } from "../../utils/roleHandlers";

class VoteCountDialog extends React.Component {
  state = {
    open: false,
    openSB: false,
    voteCount: this.props.maxVoteCount
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  handleSnackbarOpen = () => this.setState({ openSB: true });

  handleSnackbarClose = () => this.setState({ openSB: false });

  incrVoteCount = () =>
    this.setState(prevState => {
      return { voteCount: prevState.voteCount + 1 };
    });

  decrVoteCount = () =>
    this.setState(prevState => {
      return { voteCount: prevState.voteCount - 1 };
    });

  handleSave = () => {
    const { boardId } = this.props;
    const { voteCount } = this.state;
    const socket = connectSocket(boardId);

    socket.emit(SET_MAX_VOTES, voteCount, boardId);
    setUser("maxVoteCount", voteCount, boardId);

    this.handleClose();
    this.handleSnackbarOpen();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.maxVoteCount !== this.props.maxVoteCount) {
      this.setState({ voteCount: this.props.maxVoteCount });
    }
  }

  render() {
    const { open, openSB, voteCount } = this.state;
    const { fullScreen, boardId } = this.props;

    return (
      <>
        <Button
          size="small"
          variant="outlined"
          aria-label="Set Vote Count"
          color="primary"
          onClick={this.handleOpen}
          disabled={!isModerator(boardId)}
        >
          <ThumbUpIcon style={{ marginRight: 5 }} />
          Vote Count
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={this.handleClose}
          aria-labelledby="vote-count-dialog"
          aria-describedby="vote-count-dialog-description"
        >
          <DialogTitle id="vote-count-dialog">
            Set Maximum Vote Count
          </DialogTitle>
          <DialogContent>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <Typography variant="body1">
                  {"Maximum Vote Count is: " + voteCount}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label="Increase Vote Count"
                  onClick={this.incrVoteCount}
                >
                  <ArrowUpIcon fontSize="small" />
                </IconButton>
                <IconButton
                  aria-label="Decrease Vote Count"
                  onClick={this.decrVoteCount}
                >
                  <ArrowDownIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.handleSave}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={openSB}
          onClose={this.handleSnackbarClose}
          autoHideDuration={3000}
          ContentProps={{
            "aria-describedby": "vote-count-snackbar"
          }}
          message={
            <span id="vote-count-snackbar">
              You have {voteCount} votes left.
            </span>
          }
        />
      </>
    );
  }
}

export default withMobileDialog()(VoteCountDialog);
