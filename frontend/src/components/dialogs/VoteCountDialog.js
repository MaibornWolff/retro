import React, { useState } from "react";
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

function VoteCountDialog(props) {
  const { fullScreen, boardId, maxVoteCount } = props;
  const [open, setOpen] = useState(false);
  const [openSB, setOpenSB] = useState(false);
  const [voteCount, setVoteCount] = useState(maxVoteCount);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSnackbarOpen() {
    setOpenSB(true);
  }

  function handleSnackbarClose() {
    setOpenSB(false);
  }

  function handleSave() {
    const socket = connectSocket(boardId);
    socket.emit(SET_MAX_VOTES, voteCount, boardId);
    setUser("maxVoteCount", voteCount, boardId);
    handleClose();
    handleSnackbarOpen();
  }

  function incrVoteCount() {
    setVoteCount(voteCount + 1);
  }

  function decrVoteCount() {
    setVoteCount(voteCount - 1);
  }

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        aria-label="Set Vote Count"
        color="primary"
        onClick={handleOpen}
        disabled={!isModerator(boardId)}
      >
        <ThumbUpIcon style={{ marginRight: 5 }} />
        Vote Count
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="vote-count-dialog"
        aria-describedby="vote-count-dialog-description"
      >
        <DialogTitle id="vote-count-dialog">Set Maximum Vote Count</DialogTitle>
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
                onClick={incrVoteCount}
              >
                <ArrowUpIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="Decrease Vote Count"
                onClick={decrVoteCount}
              >
                <ArrowDownIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSB}
        onClose={handleSnackbarClose}
        autoHideDuration={3000}
        ContentProps={{
          "aria-describedby": "vote-count-snackbar"
        }}
        message={
          <span id="vote-count-snackbar">You have {voteCount} votes left.</span>
        }
      />
    </>
  );
}

export default withMobileDialog()(VoteCountDialog);
