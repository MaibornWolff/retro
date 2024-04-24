import React, { ChangeEvent, useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Slider,
  Typography,
} from "@mui/material";

import { DialogProps } from "../../../common/types/commonTypes";
import { useFullscreen } from "../../hooks/useFullscreen";
import { useRetroContext } from "../../context/RetroContext";
import { CallToActionButton } from "../../../common/components/buttons/CallToActionButton";

export function ManageVotesDialog({ isOpen, close }: DialogProps) {
  const fullScreen = useFullscreen();
  const {
    retroState,
    handleChangeMaxVote,
    handleResetVotes,
    handleIsVotingEnabledChanged,
    handleIsMultipleVotesPerCardAllowedChanged,
  } = useRetroContext();
  const [voteCount, setVoteCount] = useState(retroState.maxVoteCount);
  const [isMultipleVotesPerCardAllowed, setIsMultipleVotesPerCardAllowed] = useState(
    retroState.isMultipleVotesPerCardAllowed,
  );

  function handleCancel() {
    setVoteCount(retroState.maxVoteCount);
    close();
  }

  function handleVoteCountChange(event: Event, newValue: number | number[]) {
    setVoteCount(newValue as number);
  }

  function handleIsMultipleVotesPerCardAllowedChange(event: ChangeEvent<HTMLInputElement>) {
    setIsMultipleVotesPerCardAllowed(event.target.checked);
  }

  function handleStart() {
    handleChangeMaxVote(voteCount);
    handleIsVotingEnabledChanged(true);
    handleIsMultipleVotesPerCardAllowedChanged(isMultipleVotesPerCardAllowed);
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
      <DialogTitle id="vote-count-dialog">Voting Settings</DialogTitle>
      <DialogContent>
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
            defaultValue={1}
            min={1}
            max={10}
            marks
          />
        </FormControl>
        <Typography variant="body1">
          Everybody has <strong>{voteCount}</strong> {voteCount === 1 ? "vote" : "votes"}
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={isMultipleVotesPerCardAllowed}
              onChange={handleIsMultipleVotesPerCardAllowedChange}
            />
          }
          label="Allow multiple votes per card"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleReset}>Reset Votes</Button>
        <CallToActionButton onClick={handleStart}>Start Voting</CallToActionButton>
      </DialogActions>
    </Dialog>
  );
}

function getValueText(value: number) {
  return `${value}`;
}
