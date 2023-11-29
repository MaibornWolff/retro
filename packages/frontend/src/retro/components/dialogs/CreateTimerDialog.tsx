import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from "@mui/material";
import { CallToActionButton } from "../../../common/components/buttons/CallToActionButton";
import { DialogProps } from "../../../common/types/commonTypes";
import { useFullscreen } from "../../hooks/useFullscreen";
import { TimePicker } from "../../../common/components/TimePicker";
import React = require("react");
import { useValidatedTimeInput } from "../../../common/hooks/useValidatedTimeInput";

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

  const {
    value: pickerSeconds,
    formattedValue: formattedSeconds,
    isError: isSecondsError,
    onChange: onSecondsChange,
  } = useValidatedTimeInput({
    formatLength: 2,
    maxValue: 60,
    minValue: 0,
    initialValue: remainingSeconds,
  });

  const {
    value: pickerMinutes,
    formattedValue: formattedMinutes,
    isError: isMinutesError,
    onChange: onMinutesChange,
    incrementTime: onMinutesIncrement,
    decrementTime: onMinutesDecrement,
  } = useValidatedTimeInput({
    formatLength: 2,
    minValue: 0,
    maxValue: 99,
    initialValue: remainingMinutes,
  });

  function handleTimerClick() {
    close();
    if (isTimerRunning) {
      stopTimer();
    } else {
      const timerDuration = (pickerMinutes * 60 + pickerSeconds) * 1000;
      startTimer(timerDuration);
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
          formattedMinutes={formattedMinutes}
          formattedSeconds={formattedSeconds}
          isEditable={isTimerRunning}
          isMinutesError={isMinutesError}
          isSecondsError={isSecondsError}
          onSecondsChange={onSecondsChange}
          onMinutesChange={onMinutesChange}
          onMinutesIncrement={onMinutesIncrement}
          onMinutesDecrement={onMinutesDecrement}
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
