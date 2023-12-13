import React from "react";
import { Alarm, SnoozeOutlined } from "@mui/icons-material";
import { isModerator } from "../../../common/utils/participantsUtils";
import { TimerDialog } from "../dialogs/TimerDialog";
import { useRetroContext } from "../../context/RetroContext";
import { useUserContext } from "../../../common/context/UserContext";
import { useDialog } from "../../../common/hooks/useDialog";
import { useTimer } from "../../hooks/useTimer";

import { TimerStatus } from "../../types/retroTypes";
import { WiggleActionButton } from "../../../common/components/buttons/WiggleActionButton";
import useTimedEffect from "../../hooks/useTimedEffect";

export function ToggleTimerDialogButton() {
  const { isOpen, closeDialog, openDialog } = useDialog();
  const { retroState, handleStopTimer } = useRetroContext();
  const { timerStatus } = retroState;
  const { user } = useUserContext();

  const { minutes, seconds, remainingTimeLabel } = useTimer({
    onTimerFinish: handleTimerFinish,
  });
  const { isEffectActive, startEffect } = useTimedEffect({ effectLength: 3000 });

  function handleOpenDialog() {
    if (!isModerator(user)) {
      return;
    }
    openDialog();
  }

  function handleTimerFinish() {
    handleStopTimer();
    startEffect();
  }

  if (!isModerator(user) && timerStatus === TimerStatus.STOPPED && !isEffectActive) return null;

  return (
    <>
      <WiggleActionButton
        onClick={handleOpenDialog}
        label={timerStatus !== TimerStatus.STOPPED ? remainingTimeLabel : "Timer"}
        icon={timerStatus === TimerStatus.PAUSED ? <SnoozeOutlined /> : <Alarm />}
        color={
          timerStatus === TimerStatus.PAUSED
            ? "info"
            : timerStatus === TimerStatus.RUNNING || isEffectActive
            ? "error"
            : undefined
        }
        isWiggling={isEffectActive}
      />
      <TimerDialog
        isOpen={isOpen}
        close={closeDialog}
        remainingMinutes={minutes}
        remainingSeconds={seconds}
      />
    </>
  );
}
