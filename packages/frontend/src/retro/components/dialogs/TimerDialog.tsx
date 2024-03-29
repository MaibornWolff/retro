import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { CallToActionButton } from "../../../common/components/buttons/CallToActionButton";
import { DialogProps } from "../../../common/types/commonTypes";
import { TimePicker } from "../TimePicker";
import { useValidatedTimeInput } from "../../hooks/useValidatedTimeInput";
import { useRetroContext } from "../../context/RetroContext";
import { TimerStatus } from "../../types/retroTypes";
import { calculateMilliseconds } from "../../utils/timerUtils";

interface TimerDialogProps extends DialogProps {
  remainingMinutes: number;
  remainingSeconds: number;
}

export function TimerDialog({
  isOpen,
  close,
  remainingMinutes,
  remainingSeconds,
}: TimerDialogProps) {
  const {
    retroState,
    handleStartTimer,
    handleStopTimer,
    handlePauseTimer,
    handleResumeTimer,
    handleChangeTimer,
  } = useRetroContext();
  const { timerStatus } = retroState;
  const isTimerRunning = timerStatus === TimerStatus.RUNNING;
  const isTimerPaused = timerStatus === TimerStatus.PAUSED;
  const isTimerStopped = timerStatus === TimerStatus.STOPPED;

  const {
    value: seconds,
    formattedValue: formattedSeconds,
    isError: isSecondsError,
    onChange: handleSecondsChange,
  } = useValidatedTimeInput({
    formatLength: 2,
    maxValue: 59,
    minValue: 0,
    initialValue: 0,
  });

  const {
    value: minutes,
    formattedValue: formattedMinutes,
    isError: isMinutesError,
    onChange: handleMinutesChange,
    incrementTime: incrementMinutes,
  } = useValidatedTimeInput({
    formatLength: 2,
    minValue: 0,
    maxValue: 99,
    initialValue: 5,
  });

  function handleStartClick() {
    handleStartTimer(calculateMilliseconds(minutes, seconds));
    close();
  }

  function handleStopClick() {
    handleStopTimer();
    close();
  }

  function handleTimerIncrement(minutes: number) {
    if (isTimerStopped) {
      incrementMinutes(minutes);
    } else {
      handleChangeTimer(calculateMilliseconds(remainingMinutes + minutes, remainingSeconds));
    }
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
          minutes={isTimerStopped ? formattedMinutes : remainingMinutes.toString()}
          seconds={isTimerStopped ? formattedSeconds : remainingSeconds.toString()}
          disabled={!isTimerStopped}
          isMinutesError={isMinutesError}
          isSecondsError={isSecondsError}
          onSecondsChange={handleSecondsChange}
          onMinutesChange={handleMinutesChange}
          onSubmit={isTimerStopped ? handleStartClick : handleStopClick}
          onTimerIncrement={handleTimerIncrement}
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
