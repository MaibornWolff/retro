import React from "react";
import { Alarm, SnoozeOutlined } from "@mui/icons-material";
import { isModerator } from "../../../common/utils/participantsUtils";
import { TimerDialog } from "../dialogs/TimerDialog";
import { useRetroContext } from "../../context/RetroContext";
import { useUserContext } from "../../../common/context/UserContext";
import { useDialog } from "../../../common/hooks/useDialog";
import { useTimer } from "../../hooks/useTimer";

import { TimerStatus } from "../../types/retroTypes";
import { WiggleActionButton } from "./WiggleActionButton";
import useTimedEffect from "../../hooks/useTimedEffect";
import useSound from "use-sound";

export function ToggleTimerDialogButton() {
  const { isOpen, closeDialog, openDialog } = useDialog();
  const { retroState } = useRetroContext();
  const { timerStatus } = retroState;
  const { user } = useUserContext();

  const { isEffectActive, startEffect } = useTimedEffect({ effectLength: 3000 });
  const { minutes, seconds, remainingTimeLabel } = useTimer({ onTimerFinish: handleTimerExpired });
  const [playTimeExpiredSound] = useSound("/sfx/timer_expired.wav");

  function handleOpenDialog() {
    if (!isModerator(user)) return;
    openDialog();
  }

  function handleTimerExpired() {
    playTimeExpiredSound();
    startEffect();
  }

  if (!isModerator(user) && timerStatus === TimerStatus.STOPPED && !isEffectActive) return null;

  return (
    <>
      <WiggleActionButton
        onClick={handleOpenDialog}
        icon={timerStatus === TimerStatus.PAUSED ? <SnoozeOutlined /> : <Alarm />}
        color={
          timerStatus === TimerStatus.PAUSED
            ? "info"
            : timerStatus === TimerStatus.RUNNING || isEffectActive
              ? "error"
              : undefined
        }
        isWiggling={isEffectActive}
      >
        {timerStatus !== TimerStatus.STOPPED ? remainingTimeLabel : "Timer"}
      </WiggleActionButton>
      <TimerDialog
        isOpen={isOpen}
        close={closeDialog}
        remainingMinutes={minutes}
        remainingSeconds={seconds}
      />
    </>
  );
}
