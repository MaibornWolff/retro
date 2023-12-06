import { useEffect, useState, useRef } from "react";
import { useRetroContext } from "../context/RetroContext";
import { TimerStatus } from "../types/retroTypes";

interface useTimerProps {
  onTimerFinish: () => void;
}
export function useTimer({ onTimerFinish }: useTimerProps) {
  const { retroState } = useRetroContext();
  const { timerStatus, timerDuration } = retroState;
  const [timeRunning, setTimeRunning] = useState(0);
  const intervalRef = useRef<NodeJS.Timer>();
  const remainingTime = timerDuration - timeRunning;

  function createLabel() {
    return new Date(remainingTime).toISOString().slice(14, 19);
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
    if (timerStatus === TimerStatus.RUNNING && remainingTime <= 0) {
      setTimeRunning(0);
      onTimerFinish();
    }
  }, [remainingTime, onTimerFinish, timerStatus]);

  useEffect(() => {
    if (timerStatus === TimerStatus.RUNNING && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTimeRunning((timeRunning) => Math.min(timeRunning + 1000, timerDuration));
      }, 1000);
    } else if (timerStatus === TimerStatus.STOPPED && intervalRef.current) {
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
