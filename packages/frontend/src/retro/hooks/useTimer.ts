import { useEffect, useMemo, useState } from "react";

interface useTimerProps {
  timerFinished: () => void;
  defaultDuration: number;
}
export function useTimer({ timerFinished, defaultDuration }: useTimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState(defaultDuration);
  const finishTime = useMemo(() => Date.now() + duration, [duration]);
  const [milliseconds, setMilliseconds] = useState(finishTime - Date.now());
  const minutes = getMinutes(milliseconds);
  const seconds = getSeconds(milliseconds);

  function startTimer(duration: number) {
    console.log("start timer with {} duration", duration);
    console.log("current time is {}", Date.now());
    setDuration(duration);
    setMilliseconds(duration);
    setIsRunning(true);
  }
  function stopTimer() {
    console.log("stop timer");
    setIsRunning(false);
  }
  function pauseTimer() {
    console.log("pause timer");
    setIsRunning(false);
  }

  function createLabel(ms: number) {
    return new Date(ms).toISOString().slice(14, 19);
  }
  function getMinutes(ms: number) {
    console.log("minutes {}", Math.floor(ms / 1000 / 60));
    return Math.floor(ms / 1000 / 60);
  }
  function getSeconds(ms: number) {
    console.log("seconds {}", (ms / 1000) % 60);
    return (ms / 1000) % 60;
  }
  useEffect(() => {
    function endTimer() {
      console.log("end timer");
      setIsRunning(false);
      setDuration(-1);
      timerFinished();
    }
    function updateTimer() {
      console.log("Interval executed at remaining duration {}", milliseconds);
      setMilliseconds(finishTime - Date.now());
      //   setMinutes(getMinutes(milliseconds));
      //   setSeconds(getSeconds(milliseconds));
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
  }, [finishTime, isRunning, milliseconds, timerFinished]);
  return {
    milliseconds,
    minutes,
    seconds,
    remainingTimeLabel: createLabel(milliseconds),
    startTimer,
    stopTimer,
    pauseTimer,
    isTimerRunning: isRunning,
  };
}
