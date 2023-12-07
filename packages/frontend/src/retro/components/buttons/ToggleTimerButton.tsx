import React, { useEffect, useState } from "react";
import { Alarm, SnoozeOutlined } from "@mui/icons-material";
import { isModerator } from "../../../common/utils/participantsUtils";
import { CreateTimerDialog } from "../dialogs/CreateTimerDialog";
import { useRetroContext } from "../../context/RetroContext";
import { useUserContext } from "../../../common/context/UserContext";
import { useDialog } from "../../../common/hooks/useDialog";
import { useTimer } from "../../hooks/useTimer";

import { TimerStatus } from "../../types/retroTypes";
import { WiggleActionButton } from "../../../common/components/buttons/WiggleActionButton";

export function ToggleTimerButton() {
  const { isOpen, closeDialog, openDialog } = useDialog();
  const { retroState, handleStopTimer } = useRetroContext();
  const { timerStatus } = retroState;
  const { user } = useUserContext();

  const finishEffectLength = 5000;
  const [isFinishEffectActive, setIsFinishEffectActive] = useState(false);
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
    setIsFinishEffectActive(true);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsFinishEffectActive(false);
    }, finishEffectLength);
    return () => {
      clearTimeout(timeout);
    };
  }, [isFinishEffectActive]);

  if (!isModerator(user) && timerStatus === TimerStatus.STOPPED && !isFinishEffectActive)
    return null;

  return (
    <>
      <WiggleActionButton
        onClick={handleOpenDialog}
        label={timerStatus !== TimerStatus.STOPPED ? remainingTimeLabel : "Timer"}
        icon={timerStatus === TimerStatus.PAUSED ? <SnoozeOutlined /> : <Alarm />}
        color={
          timerStatus === TimerStatus.PAUSED
            ? "info"
            : timerStatus === TimerStatus.RUNNING || isFinishEffectActive
            ? "error"
            : undefined
        }
        isWiggling={isFinishEffectActive}
      />
      <CreateTimerDialog
        isOpen={isOpen}
        close={closeDialog}
        remainingMinutes={minutes}
        remainingSeconds={seconds}
      />
    </>
  );
}
