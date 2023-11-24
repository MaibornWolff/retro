import React from "react";
import { Alarm } from "@mui/icons-material";
import { ActionButton } from "../../../common/components/buttons/ActionButton";
import { isModerator } from "../../../common/utils/participantsUtils";
import { useUserContext } from "../../../common/context/UserContext";
import { useDialog } from "../../../common/hooks/useDialog";
import { CreateTimerDialog } from "../dialogs/CreateTimerDialog";
import { useTimer } from "../../hooks/useTimer";

export function ToggleRetroTimerButton() {
  const { isOpen, closeDialog, openDialog } = useDialog();
  const { user } = useUserContext();
  const {
    minutes,
    seconds,
    remainingTimeLabel,
    startTimer,
    stopTimer,
    pauseTimer,
    isTimerRunning,
  } = useTimer({
    timerFinished: handleTimerFinished,
    defaultDuration: 300000,
  });

  function handleOpenDialog() {
    if (!isModerator(user)) {
      return;
    }
    openDialog();
  }
  function handleTimerFinished() {
    console.log("timer has finished");
  }
  return (
    <>
      <ActionButton
        onClick={handleOpenDialog}
        label={isTimerRunning ? remainingTimeLabel : "Timer"}
        icon={<Alarm />}
        color={isTimerRunning ? "error" : undefined}
      />
      <CreateTimerDialog
        isOpen={isOpen}
        close={closeDialog}
        startTimer={startTimer}
        isTimerRunning={isTimerRunning}
        remainingMinutes={minutes}
        remainingSeconds={seconds}
        stopTimer={stopTimer}
        pauseTimer={pauseTimer}
      />
    </>
  );
}
