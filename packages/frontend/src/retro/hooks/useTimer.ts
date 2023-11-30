import { useEffect, useState } from "react";

interface useTimerProps {
  onTimerFinish: () => void;
  runtime: number;
}
export function useTimer({ onTimerFinish, runtime }: useTimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [remainingTime, setRemainingTime] = useState(runtime);

  function startTimer(duration: number) {
    console.log("Start Timer at ", new Date().toISOString());
    // setRemainingTime(finishTime - Date.now());
    setRemainingTime(duration);
    setIsRunning(true);
  }

  function stopTimer(isFinished: boolean = false) {
    console.log("Stop timer at ", new Date().toISOString());
    setIsRunning(false);
    setIsPaused(false);
    if (isFinished) {
      onTimerFinish();
    }
  }

  function pauseTimer() {
    console.log("pause timer");
    setIsPaused(() => !isPaused);
  }

  function createLabel() {
    return new Date(remainingTime).toISOString().slice(14, 19);
  }

  function getMinutes(ms: number) {
    if (ms < 60000) {
      return 0;
    }
    // console.log("minutes {}", Math.floor(ms / 1000 / 60));
    return Math.floor(ms / 1000 / 60);
  }

  function getSeconds(ms: number) {
    // console.log("seconds {}", Math.round((ms / 1000) % 60));
    return Math.round((ms / 1000) % 60);
  }

  useEffect(() => {
    function updateTimer() {
      setRemainingTime(() => remainingTime - 1000);
    }
    if (!isRunning || isPaused) return;

    if (remainingTime <= 0) {
      stopTimer(true);
      return;
    }

    const interval = setInterval(() => {
      updateTimer();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, remainingTime, onTimerFinish, stopTimer, isPaused]);

  return {
    milliseconds: remainingTime,
    minutes: getMinutes(remainingTime),
    seconds: getSeconds(remainingTime),
    remainingTimeLabel: createLabel(),
    startTimer,
    stopTimer,
    pauseTimer,
    isTimerRunning: isRunning,
    isTimerPaused: isPaused,
  };
}
