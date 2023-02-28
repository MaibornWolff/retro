import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { PokerFibonacciSlider } from "../sliders/PokerFibonacciSlider";
import { PokerNaturalNumbersSlider } from "../sliders/PokerNaturalNumbersSlider";
import { PokerTShirtSlider } from "../sliders/PokerTShirtSlider";
import { DialogProps } from "../../../common/types/commonTypes";
import { useUserContext } from "../../../common/context/UserContext";
import { usePokerContext } from "../../context/PokerContext";
import { useFullscreen } from "../../../retro/hooks/useFullscreen";

function valueText(value: number) {
  return `${value}`;
}

export default function PokerVoteDialog({ isOpen, close }: DialogProps) {
  const [vote, setVote] = useState<number>(0);
  const fullScreen = useFullscreen();
  const { pokerState, handleSendVote, dispatchPokerStateAction } = usePokerContext();
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
    const userUpdate = { ...user, vote, voted: true };
    dispatchPokerStateAction({ type: "SET_USER", payload: userUpdate });
    handleSendVote({ vote, userId: user.id });
    handleClose();
  }

  function renderSlider() {
    const { pokerUnit } = pokerState;
    switch (pokerUnit.unitType) {
      case "fibonacci":
        return (
          <PokerFibonacciSlider
            maxValue={pokerUnit.unitRangeHigh}
            onChange={handleSliderChange}
            valueText={valueText}
          />
        );
      case "naturalnumbers":
        return (
          <PokerNaturalNumbersSlider
            maxValue={pokerUnit.unitRangeHigh}
            onChange={handleSliderChange}
            valueText={valueText}
          />
        );
      case "tshirt":
        return <PokerTShirtSlider onChange={handleSliderChange} />;
      default:
        return null;
    }
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
        {renderSlider()}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
