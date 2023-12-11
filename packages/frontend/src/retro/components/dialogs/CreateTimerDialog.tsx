import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { CallToActionButton } from "../../../common/components/buttons/CallToActionButton";
import { DialogProps } from "../../../common/types/commonTypes";
import { TimePicker } from "../../../common/components/TimePicker";
import { useValidatedTimeInput } from "../../../common/hooks/useValidatedTimeInput";
import { useRetroContext } from "../../context/RetroContext";
import { TimerStatus } from "../../types/retroTypes";
import React = require("react");

interface CreateTimerDialogProps extends DialogProps {
  remainingMinutes: number;
  remainingSeconds: number;
}
export function CreateTimerDialog({
  isOpen,
  close,
  remainingMinutes,
  remainingSeconds,
}: CreateTimerDialogProps) {
  const { retroState, handleStartTimer, handleStopTimer, handlePauseTimer, handleResumeTimer } =
    useRetroContext();
  const { timerStatus } = retroState;
  const isTimerRunning = timerStatus === TimerStatus.RUNNING;
  const isTimerPaused = timerStatus === TimerStatus.PAUSED;
  const isTimerStopped = timerStatus === TimerStatus.STOPPED;

  const {
    value: pickedSeconds,
    formattedValue: formattedSeconds,
    isError: isSecondsError,
    onChange: handleSecondsChange,
  } = useValidatedTimeInput({
    formatLength: 2,
    maxValue: 60,
    minValue: 0,
    initialValue: 0,
  });

  const {
    value: pickedMinutes,
    formattedValue: formattedMinutes,
    isError: isMinutesError,
    onChange: handleMinutesChange,
  } = useValidatedTimeInput({
    formatLength: 2,
    minValue: 0,
    maxValue: 99,
    initialValue: 5,
  });
  function handleStartClick() {
    close();
    const timerDuration = (pickedMinutes * 60 + pickedSeconds) * 1000;
    handleStartTimer(timerDuration);
  }
  function handleStopClick() {
    close();
    handleStopTimer();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={isOpen}
      onClose={close}
      aria-labelledby="new-timer-dialog"
    >
      <DialogTitle id="new-timer-dialog">Set Timer</DialogTitle>
      <DialogContent>
        <TimePicker
          minutes={isTimerRunning || isTimerPaused ? remainingMinutes.toString() : formattedMinutes}
          seconds={isTimerRunning || isTimerPaused ? remainingSeconds.toString() : formattedSeconds}
          isEditable={!isTimerRunning}
          isMinutesError={isMinutesError}
          isSecondsError={isSecondsError}
          onSecondsChange={handleSecondsChange}
          onMinutesChange={handleMinutesChange}
          onEnter={isTimerStopped ? handleStartClick : handleStopClick}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        {isTimerRunning && <Button onClick={handlePauseTimer}>Pause</Button>}
        {isTimerPaused && <Button onClick={handleResumeTimer}>Resume</Button>}
        <CallToActionButton
          onClick={isTimerStopped ? handleStartClick : handleStopClick}
          disabled={isMinutesError || isSecondsError}
        >
          {isTimerStopped ? "Start" : "Stop"}
        </CallToActionButton>
      </DialogActions>
    </Dialog>
  );
}
