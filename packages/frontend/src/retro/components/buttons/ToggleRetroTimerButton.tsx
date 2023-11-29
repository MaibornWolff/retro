import React, { useEffect, useState } from "react";
import { Alarm } from "@mui/icons-material";
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

  const {
    minutes,
    seconds,
    remainingTimeLabel,
    startTimer,
    stopTimer,
    pauseTimer,
    isTimerRunning,
  } = useTimer({
    onTimerFinish: handleTimerFinish,
    defaultDuration: 300000,
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
    }, 10000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isParticlesActive]);

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
      {isParticlesActive && <MaibornConfetti />}
    </>
  );
}
