import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { CallToActionButton } from "../../../common/components/buttons/CallToActionButton";
import { DialogProps } from "../../../common/types/commonTypes";
import { useRetroContext } from "../../context/RetroContext";
import { TimerStatus } from "../../types/retroTypes";
import { calculateMilliseconds } from "../../utils/timerUtils";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

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
  const { retroState, handleStartTimer, handleStopTimer, handlePauseTimer, handleResumeTimer } =
    useRetroContext();
  const { timerStatus } = retroState;
  const isTimerRunning = timerStatus === TimerStatus.RUNNING;
  const isTimerPaused = timerStatus === TimerStatus.PAUSED;
  const isTimerStopped = timerStatus === TimerStatus.STOPPED;
  const [minutes, setMinutes] = useState(remainingMinutes);
  const [seconds, setSeconds] = useState(remainingSeconds);

  function handleStartClick() {
    handleStartTimer(calculateMilliseconds(minutes, seconds));
    close();
  }

  function handleStopClick() {
    handleStopTimer();
    close();
  }

  function setValue(newValue: Dayjs) {
    setMinutes(newValue.minute());
    setSeconds(newValue.second());
  }

  return (
    <Dialog maxWidth="xs" open={isOpen} onClose={close} aria-labelledby="new-timer-dialog">
      <DialogTitle id="new-timer-dialog">Set Timer</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            slotProps={{ textField: { fullWidth: true } }}
            autoFocus
            disabled={isTimerRunning}
            views={["minutes", "seconds"]}
            format="mm:ss"
            onChange={(newValue) => newValue && setValue(newValue)}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        {isTimerRunning && <Button onClick={handlePauseTimer}>Pause</Button>}
        {isTimerPaused && <Button onClick={handleResumeTimer}>Resume</Button>}
        <CallToActionButton onClick={isTimerStopped ? handleStartClick : handleStopClick}>
          {isTimerStopped ? "Start" : "Stop"}
        </CallToActionButton>
      </DialogActions>
    </Dialog>
  );
}
