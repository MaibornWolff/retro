import React, { useEffect, useState } from "react";
import { Alarm, SnoozeOutlined } from "@mui/icons-material";
import { ActionButton } from "../../../common/components/buttons/ActionButton";
import { isModerator } from "../../../common/utils/participantsUtils";
import { CreateTimerDialog } from "../dialogs/CreateTimerDialog";
import { useRetroContext } from "../../context/RetroContext";

import { useUserContext } from "../../../common/context/UserContext";
import { useDialog } from "../../../common/hooks/useDialog";
import { useTimer } from "../../hooks/useTimer";

import MaibornConfetti from "../../../common/components/MaibornConfetti";
import { TimerStatus } from "../../types/retroTypes";

export function ToggleTimerButton() {
  const { isOpen, closeDialog, openDialog } = useDialog();
  const { retroState, handleStopTimer } = useRetroContext();
  const { timerStatus } = retroState;

  const { user } = useUserContext();
  const [isParticlesActive, setIsParticlesActive] = useState(false);

  const confettiDuration = 10000;

  const { minutes, seconds, remainingTimeLabel } = useTimer({
    onTimerFinish: handleTimerFinish,
  });

  function handleOpenDialog() {
    if (!isModerator(user)) {
      return;
    }
    openDialog();
  }

  function handleTimerFinish() {
    handleStopTimer();
    setIsParticlesActive(true);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsParticlesActive(false);
    }, confettiDuration);
    return () => {
      clearTimeout(timeout);
    };
  }, [isParticlesActive]);

  if (!isModerator(user) && timerStatus === TimerStatus.STOPPED) return null;

  return (
    <>
      <ActionButton
        onClick={handleOpenDialog}
        label={timerStatus !== TimerStatus.STOPPED ? remainingTimeLabel : "Timer"}
        icon={timerStatus === TimerStatus.PAUSED ? <SnoozeOutlined /> : <Alarm />}
        color={
          timerStatus === TimerStatus.PAUSED
            ? "info"
            : timerStatus === TimerStatus.RUNNING
            ? "error"
            : undefined
        }
      />
      <CreateTimerDialog
        isOpen={isOpen}
        close={closeDialog}
        remainingMinutes={minutes}
        remainingSeconds={seconds}
      />
      {isParticlesActive && <MaibornConfetti />}
    </>
  );
}
