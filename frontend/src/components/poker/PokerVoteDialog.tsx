import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { PokerContext } from "../../context/PokerContext";
import { SET_POKER_VOTE } from "../../constants/event.constants";
import { usePokerStore } from "../../hooks/poker.hooks";
import { PokerFibonacciSlider } from "./sliders/PokerFibonacciSlider";
import { PokerNaturalNumbersSlider } from "./sliders/PokerNaturalNumbersSlider";
import { PokerTShirtSlider } from "./sliders/PokerTShirtSlider";
import {
  POKER_UNIT_FIBONACCI,
  POKER_UNIT_NATURAL_NUMBERS,
  POKER_UNIT_TSHIRT,
} from "../../constants/poker.constants";

interface PokerVoteDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
}

function valueText(value: number) {
  return `${value}`;
}

export default function PokerVoteDialog(props: PokerVoteDialogProps) {
  const pokerUnit = usePokerStore((state) => state.pokerUnit);
  const { open, setOpen, userId } = props;
  const { pokerId, socket, setPokerVote } = useContext(PokerContext);
  const [vote, setVote] = useState<number | Array<number>>(0);
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("sm"));

  function handleSliderChange(event: any, newValue: number | number[]) {
    setVote(newValue);
  }

  function handleClose() {
    setVote(0);
    setOpen(false);
  }

  function handleSubmit() {
    socket.emit(SET_POKER_VOTE, pokerId, userId, vote as number);
    setPokerVote(pokerId, vote as number);
    handleClose();
  }

  function renderSlider() {
    switch (pokerUnit.unitType) {
      case POKER_UNIT_FIBONACCI:
        return (
          <PokerFibonacciSlider
            maxValue={pokerUnit.unitRangeHigh}
            onChange={handleSliderChange}
            valueText={valueText}
          />
        );
      case POKER_UNIT_NATURAL_NUMBERS:
        return (
          <PokerNaturalNumbersSlider
            maxValue={pokerUnit.unitRangeHigh}
            onChange={handleSliderChange}
            valueText={valueText}
          />
        );
      case POKER_UNIT_TSHIRT:
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
      open={open}
      onClose={handleClose}
      aria-labelledby="poker-vote-dialog-title"
    >
      <DialogTitle id="poker-vote-dialog-title">
        What is your estimation?
      </DialogTitle>
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
