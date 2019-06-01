import React, { useState, useEffect, useContext } from "react";
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
import { BoardContext } from "../context/BoardContext";

function VoteCountDialog(props) {
  const { maxVoteCount, fullScreen } = props;
  const [open, setOpen] = useState(false);
  const [voteCount, setVoteCount] = useState(maxVoteCount);
  const boardId = useContext(BoardContext);

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
    closeDialog();
  }

  function resetVotes() {
    const socket = connectSocket(boardId);
    socket.emit(RESET_VOTES, boardId);
    closeDialog();
  }

  useEffect(() => {
    setVoteCount(maxVoteCount);
  }, [maxVoteCount]);

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        aria-label="Set Vote Count"
        color="primary"
        onClick={openDialog}
        disabled={!isModerator(boardId)}
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
          <Button color="primary" onClick={resetVotes}>
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
