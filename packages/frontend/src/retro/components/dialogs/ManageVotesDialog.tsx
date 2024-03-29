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
    handleCardVotingLimitChanged,
  } = useRetroContext();
  const [voteCount, setVoteCount] = useState(retroState.maxVoteCount);
  const [isMaxVotesPerCardLimited, setIsMaxVotesPerCardLimited] = useState(
    retroState.cardVotingLimit === 1,
  );

  function handleCancel() {
    setVoteCount(retroState.maxVoteCount);
    close();
  }

  function handleVoteCountChange(event: Event, newValue: number | number[]) {
    setVoteCount(newValue as number);
  }

  function handleVotingLimitChange(event: ChangeEvent<HTMLInputElement>) {
    setIsMaxVotesPerCardLimited(event.target.checked);
  }

  function handleStart() {
    handleChangeMaxVote(voteCount);
    handleIsVotingEnabledChanged(true);
    handleCardVotingLimitChanged(isMaxVotesPerCardLimited ? 1 : Number.MAX_VALUE);
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
        <Typography variant="body1">
          Everybody has <strong>{voteCount}</strong> votes
        </Typography>
        <FormControlLabel
          control={
            <Checkbox checked={isMaxVotesPerCardLimited} onChange={handleVotingLimitChange} />
          }
          label="Maximum one vote per card"
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
