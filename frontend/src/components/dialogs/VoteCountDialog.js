import React from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import IncrementIcon from "@material-ui/icons/ExposurePlus1";
import DecrementIcon from "@material-ui/icons/ExposureNeg1";
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
  DialogContentText
} from "@material-ui/core";

import { connectSocket } from "../../utils";
import { SET_MAX_VOTES, RESET_VOTES } from "../../utils/eventNames";
import { isModerator } from "../../utils/roleHandlers";

class VoteCountDialog extends React.Component {
  state = {
    isDialogOpen: false,
    voteCount: this.props.maxVoteCount
  };

  openDialog = () => this.setState({ isDialogOpen: true });

  closeDialog = () => this.setState({ isDialogOpen: false });

  incrementVotes = () =>
    this.setState(prevState => {
      return { voteCount: prevState.voteCount + 1 };
    });

  decrementVotes = () =>
    this.setState(prevState => {
      return { voteCount: prevState.voteCount - 1 };
    });

  handleSave = () => {
    const { boardId } = this.props;
    const { voteCount } = this.state;
    const socket = connectSocket(boardId);

    socket.emit(SET_MAX_VOTES, voteCount, boardId);

    this.closeDialog();
  };

  resetVotes = () => {
    const { boardId } = this.props;
    const socket = connectSocket(boardId);

    socket.emit(RESET_VOTES, boardId);

    this.closeDialog();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.maxVoteCount !== this.props.maxVoteCount) {
      this.setState({ voteCount: this.props.maxVoteCount });
    }
  }

  render() {
    const { isDialogOpen, voteCount } = this.state;
    const { fullScreen, boardId } = this.props;

    return (
      <>
        <Button
          size="small"
          variant="outlined"
          aria-label="Set Vote Count"
          color="primary"
          onClick={this.openDialog}
          disabled={!isModerator(boardId)}
        >
          <ThumbUpIcon style={{ marginRight: 5 }} />
          Vote Count
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={isDialogOpen}
          onClose={this.closeDialog}
          aria-labelledby="vote-count-dialog"
          aria-describedby="vote-count-dialog-description"
        >
          <DialogTitle id="vote-count-dialog">Vote Count Settings</DialogTitle>
          <DialogContent>
            <DialogContentText id="vote-count-dialog-description">
              Set your maximum vote count or reset all votes.
            </DialogContentText>
            <br />
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <Typography variant="body1">
                  {"Maximum Vote Count: " + voteCount}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label="Increase Vote Count"
                  onClick={this.incrementVotes}
                >
                  <IncrementIcon />
                </IconButton>
                <IconButton
                  aria-label="Decrease Vote Count"
                  onClick={this.decrementVotes}
                >
                  <DecrementIcon />
                </IconButton>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.resetVotes}>
              Reset Votes
            </Button>
            <Button color="primary" onClick={this.closeDialog}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.handleSave}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withMobileDialog()(VoteCountDialog);
