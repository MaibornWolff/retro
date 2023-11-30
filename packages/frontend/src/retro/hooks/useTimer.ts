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
    if (isFinished) {
      onTimerFinish();
    }
  }

  function pauseTimer() {
    console.log("pause timer");
    // TO-DO: write real pause logic
    setIsRunning(false);
  }

  function createLabel() {
    return new Date(remainingTime).toISOString().slice(14, 19);
  }

  function getMinutes(ms: number) {
    if (ms < 60000) {
      return 0;
    }

    console.log("minutes {}", Math.floor(ms / 1000 / 60));
    return Math.floor(ms / 1000 / 60);
  }
  function getSeconds(ms: number) {
    console.log("seconds {}", Math.round((ms / 1000) % 60));
    return Math.round((ms / 1000) % 60);
  }
  useEffect(() => {
    function endTimer() {
      console.log("end timer");
      setIsRunning(false);
      // TO-DO: Set Duration to last set timer length
      setDuration(-1);
      onTimerFinish();
    }
    function updateTimer() {
      console.log("Interval executed at remaining duration {}", milliseconds);
      setMilliseconds(finishTime - Date.now());
    }
    if (!isRunning) return;

    if (milliseconds <= 0) {
      endTimer();
      return;
    }

    const interval = setInterval(() => {
      updateTimer();
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, [finishTime, isRunning, milliseconds, onTimerFinish]);
  return {
    milliseconds,
    minutes,
    seconds,
    remainingTimeLabel: createLabel(),
    startTimer,
    stopTimer,
    pauseTimer,
    isTimerRunning: isRunning,
  };
}
