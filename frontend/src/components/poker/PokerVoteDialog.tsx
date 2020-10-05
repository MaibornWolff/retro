import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { getFibonacciMarks } from "../../utils/poker.utils";
import { PokerContext } from "../../context/PokerContext";
import { SET_POKER_VOTE } from "../../constants/event.constants";

interface PokerVoteDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
}

const marks = getFibonacciMarks(0, 34);

function valueText(value: number) {
  return `${value}`;
}

export default function PokerVoteDialog(props: PokerVoteDialogProps) {
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
        <Slider
          color="primary"
          defaultValue={0}
          onChange={handleSliderChange}
          getAriaValueText={valueText}
          aria-labelledby="vote-slider-label"
          step={null}
          valueLabelDisplay="auto"
          marks={marks}
          min={0}
          max={34}
        />
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
