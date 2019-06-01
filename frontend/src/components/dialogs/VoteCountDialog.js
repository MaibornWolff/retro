import React, { useState, useContext } from "react";
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
import { ROLE_MODERATOR } from "../../utils/roleHandlers";
import { BoardContext } from "../context/BoardContext";
import { UserContext } from "../context/UserContext";
import { setMaxVote, resetVotes } from "../../actions";

function VoteCountDialog(props) {
  const { fullScreen } = props;
  const boardId = useContext(BoardContext);
  const { userState, dispatch } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [voteCount, setVoteCount] = useState(userState.maxVoteCount);

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function incr() {
    setVoteCount(voteCount + 1);
  }

  function decr() {
    setVoteCount(voteCount - 1);
  }

  function handleSave() {
    const socket = connectSocket(boardId);
    socket.emit(SET_MAX_VOTES, voteCount, boardId);
    setMaxVote(boardId, voteCount, dispatch);
    closeDialog();
  }

  function handleReset() {
    const socket = connectSocket(boardId);
    socket.emit(RESET_VOTES, boardId);
    resetVotes(boardId, voteCount, dispatch);
    closeDialog();
  }

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        aria-label="Set Vote Count"
        color="primary"
        onClick={openDialog}
        disabled={userState.role !== ROLE_MODERATOR}
      >
        <ThumbUpIcon style={{ marginRight: 5 }} />
        Vote Count
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={closeDialog}
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
              <IconButton aria-label="Increase Vote Count" onClick={incr}>
                <IncrementIcon />
              </IconButton>
              <IconButton aria-label="Decrease Vote Count" onClick={decr}>
                <DecrementIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleReset}>
            Reset Votes
          </Button>
          <Button color="primary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withMobileDialog()(VoteCountDialog);
