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
  const [isVotingPerCardLimited, setIsVotingPerCardLimited] = useState(true);

  function handleCancel() {
    setVoteCount(retroState.maxVoteCount);
    close();
  }

  function handleVoteCountChange(event: any, newValue: number | number[]) {
    setVoteCount(newValue as number);
  }

  function handleVotingLimitChange(event: ChangeEvent<HTMLInputElement>) {
    setIsVotingPerCardLimited(event.target.checked);
  }

  function handleStart() {
    handleChangeMaxVote(voteCount);
    handleIsVotingEnabledChanged(true);
    handleCardVotingLimitChanged(isVotingPerCardLimited ? 1 : 999);
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
          control={<Checkbox checked={isVotingPerCardLimited} onChange={handleVotingLimitChange} />}
          label="One Vote per Card"
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
