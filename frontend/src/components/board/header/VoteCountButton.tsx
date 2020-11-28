import React, { useState, useContext } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Slider,
  FormControl,
} from "@material-ui/core";

import { UserContext } from "../../../context/UserContext";
import { BoardContext } from "../../../context/BoardContext";
import { defaultBoard } from "../../../utils";
import { ROLE_MODERATOR } from "../../../utils/user.utils";
import { SET_MAX_VOTES, RESET_VOTES } from "../../../constants/event.constants";

function getValueText(value: number) {
  return `${value}`;
}

export default function VoteCountButton() {
  const { boardId, socket } = useContext(BoardContext);
  const { userState, setMaxVote, resetVotes } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [voteCount, setVoteCount] = useState(getVoteCount());
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("sm"));

  function getVoteCount() {
    if (userState.maxVoteCount) return userState.maxVoteCount;
    return defaultBoard.maxVoteCount;
  }

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function handleCancel() {
    setVoteCount(getVoteCount());
    closeDialog();
  }

  function handleVoteCountChange(event: any, newValue: number | number[]) {
    setVoteCount(newValue as number);
  }

  function handleSave() {
    socket.emit(SET_MAX_VOTES, voteCount, boardId);
    setMaxVote(boardId, voteCount);
    closeDialog();
  }

  function handleReset() {
    socket.emit(RESET_VOTES, boardId);
    resetVotes(boardId, voteCount);
    setVoteCount(getVoteCount());
    closeDialog();
  }

  return (
    <React.Fragment>
      <MenuItem
        aria-label="Set Vote Count"
        color="primary"
        onClick={openDialog}
        disabled={userState.role !== ROLE_MODERATOR}
      >
        <ListItemIcon>
          <ThumbUpIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Manage Votes" />
      </MenuItem>
      <Dialog
        fullWidth
        maxWidth="xs"
        fullScreen={fullScreen}
        open={open}
        onClose={closeDialog}
        aria-labelledby="vote-count-dialog"
        aria-describedby="vote-count-dialog-description"
      >
        <DialogTitle id="vote-count-dialog">Vote Count Settings</DialogTitle>
        <DialogContent>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <FormControl fullWidth>
                <Typography id="vote-count-label" gutterBottom>
                  Set your maximum vote count
                </Typography>
                <Slider
                  value={voteCount}
                  onChange={handleVoteCountChange}
                  valueLabelDisplay="auto"
                  aria-labelledby="vote-count-slider"
                  getAriaValueText={getValueText}
                  min={1}
                  max={10}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                Everybody has <strong>{voteCount}</strong> votes
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleReset}>
            Reset Votes
          </Button>
          <Button color="primary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
