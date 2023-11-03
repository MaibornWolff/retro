import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { DialogProps } from "../../../common/types/commonTypes";
import { useUserContext } from "../../../common/context/UserContext";
import { usePokerContext } from "../../context/PokerContext";
import { useFullscreen } from "../../../retro/hooks/useFullscreen";
import { CallToActionButton } from "../../../common/components/buttons/CallToActionButton";
import { PokerVoteSlider } from "../PokerVoteSlider";

export function PokerVoteDialog({ isOpen, close }: DialogProps) {
  const [vote, setVote] = useState<number>(0);
  const fullScreen = useFullscreen();
  const { handleSendVote } = usePokerContext();
  const { user } = useUserContext();

  function handleSliderChange(event: any, newValue: number | number[]) {
    const vote = Array.isArray(newValue) ? newValue[0] : newValue;
    setVote(vote ?? 0);
  }

  function handleClose() {
    setVote(0);
    close();
  }

  function handleSubmit() {
    handleSendVote({ vote, userId: user.id });
    handleClose();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="poker-vote-dialog-title"
    >
      <DialogTitle id="poker-vote-dialog-title">What is your estimation?</DialogTitle>
      <DialogContent>
        <Typography id="vote-slider-label" gutterBottom>
          Estimation
        </Typography>
        <PokerVoteSlider onSliderChange={handleSliderChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <CallToActionButton onClick={handleSubmit}>Vote</CallToActionButton>
      </DialogActions>
    </Dialog>
  );
}
