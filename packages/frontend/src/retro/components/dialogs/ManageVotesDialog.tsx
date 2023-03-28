import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Slider,
  Typography,
} from "@mui/material";

import { DialogProps } from "../../../common/types/commonTypes";
import { useFullscreen } from "../../hooks/useFullscreen";
import { useRetroContext } from "../../context/RetroContext";

export function ManageVotesDialog({ isOpen, close }: DialogProps) {
  const fullScreen = useFullscreen();
  const { retroState, handleChangeMaxVote, handleResetVotes } = useRetroContext();
  const [voteCount, setVoteCount] = useState(retroState.maxVoteCount);

  function handleCancel() {
    setVoteCount(retroState.maxVoteCount);
    close();
  }

  function handleVoteCountChange(event: any, newValue: number | number[]) {
    setVoteCount(newValue as number);
  }

  function handleSave() {
    handleChangeMaxVote(voteCount);
    close();
  }

  function handleReset() {
    handleResetVotes();
    setVoteCount(retroState.maxVoteCount);
    close();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      open={isOpen}
      onClose={close}
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
  );
}

function getValueText(value: number) {
  return `${value}`;
}
