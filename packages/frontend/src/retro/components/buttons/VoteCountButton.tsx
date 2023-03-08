import React, { useState } from "react";
import { ThumbUp } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Slider,
  Typography,
} from "@mui/material";

import { useRetroContext } from "../../context/RetroContext";
import { useUserContext } from "../../../common/context/UserContext";
import { useFullscreen } from "../../hooks/useFullscreen";
import { isModerator } from "../../../common/utils/participantsUtils";

function getValueText(value: number) {
  return `${value}`;
}

export default function VoteCountButton() {
  const { retroState, handleChangeMaxVote, handleResetVotes } = useRetroContext();
  const { user } = useUserContext();
  const [open, setOpen] = useState(false);
  const [voteCount, setVoteCount] = useState(retroState.maxVoteCount);
  const fullScreen = useFullscreen();

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function handleCancel() {
    setVoteCount(retroState.maxVoteCount);
    closeDialog();
  }

  function handleVoteCountChange(event: any, newValue: number | number[]) {
    setVoteCount(newValue as number);
  }

  function handleSave() {
    handleChangeMaxVote(voteCount);
    closeDialog();
  }

  function handleReset() {
    handleResetVotes();
    setVoteCount(retroState.maxVoteCount);
    closeDialog();
  }

  return (
    <>
      <MenuItem
        aria-label="Set Vote Count"
        color="primary"
        onClick={openDialog}
        disabled={!isModerator(user)}
      >
        <ListItemIcon>
          <ThumbUp fontSize="small" />
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
    </>
  );
}
