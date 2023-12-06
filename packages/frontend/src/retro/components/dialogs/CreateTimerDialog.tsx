import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { CallToActionButton } from "../../../common/components/buttons/CallToActionButton";
import { DialogProps } from "../../../common/types/commonTypes";
import { useFullscreen } from "../../hooks/useFullscreen";
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
  const fullScreen = useFullscreen();
  const isTimerRunning = timerStatus === TimerStatus.RUNNING;

  const {
    value: pickedSeconds,
    formattedValue: formattedSeconds,
    isError: isSecondsError,
    onChange: handleSecondsChange,
  } = useValidatedTimeInput({
    formatLength: 2,
    maxValue: 60,
    minValue: 0,
    initialValue: remainingSeconds,
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
    initialValue: remainingMinutes,
  });

  function handleTimerClick() {
    close();
    if (timerStatus === TimerStatus.STOPPED) {
      const timerDuration = (pickedMinutes * 60 + pickedSeconds) * 1000;
      handleStartTimer(timerDuration);
    } else {
      handleStopTimer();
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
          formattedMinutes={isTimerRunning ? remainingMinutes.toString() : formattedMinutes}
          formattedSeconds={isTimerRunning ? remainingSeconds.toString() : formattedSeconds}
          isEditable={!isTimerRunning}
          isMinutesError={isMinutesError}
          isSecondsError={isSecondsError}
          onSecondsChange={handleSecondsChange}
          onMinutesChange={handleMinutesChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        {isTimerRunning && <Button onClick={handlePauseTimer}>Pause</Button>}
        {timerStatus === TimerStatus.PAUSED && (
          <Button onClick={handleResumeTimer} color="warning">
            Resume
          </Button>
        )}
        <CallToActionButton onClick={handleTimerClick}>
          {timerStatus === TimerStatus.STOPPED ? "Start" : "Stop"}
        </CallToActionButton>
      </DialogActions>
    </Dialog>
  );
}
