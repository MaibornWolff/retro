import React, { useEffect, useState } from "react";
import { Alarm, SnoozeOutlined } from "@mui/icons-material";
import { ActionButton } from "../../../common/components/buttons/ActionButton";
import { isModerator } from "../../../common/utils/participantsUtils";
import { CreateTimerDialog } from "../dialogs/CreateTimerDialog";

import { useUserContext } from "../../../common/context/UserContext";
import { useDialog } from "../../../common/hooks/useDialog";
import { useTimer } from "../../hooks/useTimer";

import MaibornConfetti from "../../../common/components/MaibornConfetti";

export function ToggleRetroTimerButton() {
  const { isOpen, closeDialog, openDialog } = useDialog();
  const { user } = useUserContext();
  const [isParticlesActive, setIsParticlesActive] = useState(false);

  const confettiDuration = 10000;

  const {
    minutes,
    seconds,
    remainingTimeLabel,
    startTimer,
    stopTimer,
    pauseTimer,
    isTimerRunning,
    isTimerPaused,
  } = useTimer({
    onTimerFinish: handleTimerFinish,
    runtime: 300000,
  });

  function handleOpenDialog() {
    if (!isModerator(user)) {
      return;
    }
    openDialog();
  }

  function handleTimerFinish() {
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

  return (
    <>
      <ActionButton
        onClick={handleOpenDialog}
        label={isTimerRunning ? remainingTimeLabel : "Timer"}
        icon={isTimerPaused ? <SnoozeOutlined /> : <Alarm />}
        color={isTimerPaused ? "info" : isTimerRunning ? "error" : undefined}
      />
      <CreateTimerDialog
        isOpen={isOpen}
        close={closeDialog}
        startTimer={startTimer}
        isTimerRunning={isTimerRunning}
        isTimerPaused={isTimerPaused}
        remainingMinutes={minutes}
        remainingSeconds={seconds}
        stopTimer={stopTimer}
        pauseTimer={pauseTimer}
      />
      {isParticlesActive && <MaibornConfetti />}
    </>
  );
}
