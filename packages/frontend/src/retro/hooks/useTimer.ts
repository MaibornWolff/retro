import { useEffect, useMemo, useState } from "react";

interface useTimerProps {
  onTimerFinished: () => void;
  defaultDuration: number;
}
export function useTimer({ onTimerFinished, defaultDuration }: useTimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState(defaultDuration);
  const finishTime = useMemo(() => Date.now() + duration, [duration]);
  const [milliseconds, setMilliseconds] = useState(finishTime - Date.now());
  const minutes = getMinutes(milliseconds);
  const seconds = getSeconds(milliseconds);

  function startTimer(duration: number) {
    setDuration(duration);
    setMilliseconds(duration);
    setIsRunning(true);
  }
  function stopTimer() {
    setIsRunning(false);
  }
  function pauseTimer() {
    console.log("pause timer");
    // TO-DO: write real pause logic
    setIsRunning(false);
  }

  function createLabel() {
    return new Date(milliseconds).toISOString().slice(14, 19);
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
      onTimerFinished();
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
  }, [finishTime, isRunning, milliseconds, onTimerFinished]);
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
