import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from "@mui/material";
import { CallToActionButton } from "../../../common/components/buttons/CallToActionButton";
import { DialogProps } from "../../../common/types/commonTypes";
import { useFullscreen } from "../../hooks/useFullscreen";
import { TimePicker } from "../../../common/components/TimePicker";
import React = require("react");

interface CreateTimerDialogProps extends DialogProps {
  startTimer: (duration: number) => void;
  stopTimer: () => void;
  pauseTimer: () => void;
  isTimerRunning: boolean;
  remainingMinutes: number;
  remainingSeconds: number;
}
export function CreateTimerDialog({
  isOpen,
  close,
  startTimer,
  stopTimer,
  pauseTimer,
  isTimerRunning,
  remainingMinutes,
  remainingSeconds,
}: CreateTimerDialogProps) {
  const fullScreen = useFullscreen();

  function handleTimerClick() {
    close();
    if (isTimerRunning) {
      stopTimer();
    } else {
      startTimer(15000);
    }
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      open={isOpen}
      onClose={close}
      aria-labelledby="new-card-dialog"
    >
      <DialogTitle id="new-card-dialog">Set Timer</DialogTitle>
      <DialogContent>
        <TimePicker
          minutes={remainingMinutes}
          seconds={remainingSeconds}
          isEditable={isTimerRunning}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        {isTimerRunning && <Button onClick={pauseTimer}>Pause</Button>}
        <CallToActionButton onClick={handleTimerClick}>
          {isTimerRunning ? "Stop" : "Start"}
        </CallToActionButton>
      </DialogActions>
    </Dialog>
  );
}
