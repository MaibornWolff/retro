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

  function createLabel() {
    const timelabel = new Date(remainingTime).toISOString().slice(11, 19);
    if (timelabel[0] === "0" && timelabel[1] === "0") {
      return timelabel.slice(3, timelabel.length);
    }
    return timelabel;
  }

  function getMinutes() {
    if (remainingTime < 60000) {
      return 0;
    }
    return Math.floor(remainingTime / 1000 / 60);
  }

  function getSeconds() {
    return Math.round((remainingTime / 1000) % 60);
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
  }, [timerStatus, timeRunning, timerDuration]);

  return {
    milliseconds: remainingTime,
    minutes: getMinutes(),
    seconds: getSeconds(),
    remainingTimeLabel: createLabel(),
  };
}
