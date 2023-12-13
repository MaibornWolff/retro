import { useEffect, useRef, useState } from "react";
import { useRetroContext } from "../context/RetroContext";
import { TimerStatus } from "../types/retroTypes";

interface useTimerProps {
  onTimerFinish: () => void;
}

export function useTimer({ onTimerFinish }: useTimerProps) {
  const { timerStatus, timerDuration } = useRetroContext().retroState;
  const [timeRunning, setTimeRunning] = useState(0);
  const intervalRef = useRef<NodeJS.Timer>();

  const remainingTime = timerDuration - timeRunning;
  const minutes = Math.floor(remainingTime / 1000 / 60);
  const seconds = Math.round((remainingTime / 1000) % 60);

  const labelOptions: Intl.DateTimeFormatOptions = {
    minute: "numeric",
    second: "numeric",
    hourCycle: "h23",
    hour: minutes > 59 ? "numeric" : undefined,
  };

  function createLabel() {
    const date = new Date(0);
    date.setHours(0, 0, 0);
    date.setTime(date.getTime() + remainingTime);
    return new Intl.DateTimeFormat("de-DE", labelOptions).format(date);
  }

  useEffect(() => {
    setTimeRunning(0);
  }, [timerDuration]);

  useEffect(() => {
    if (timerStatus === TimerStatus.RUNNING && remainingTime <= 0) {
      onTimerFinish();
    }
  }, [remainingTime, onTimerFinish, timerStatus]);

  useEffect(() => {
    if (timerStatus === TimerStatus.RUNNING && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTimeRunning((timeRunning) => Math.min(timeRunning + 1000, timerDuration));
      }, 1000);
    } else if (timerStatus !== TimerStatus.RUNNING && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerStatus]);

  return {
    milliseconds: remainingTime,
    minutes,
    seconds,
    remainingTimeLabel: createLabel(),
  };
}
