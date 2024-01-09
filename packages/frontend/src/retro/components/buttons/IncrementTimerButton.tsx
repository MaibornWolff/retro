import React from "react";
import { ActionButton } from "../../../common/components/buttons/ActionButton";

interface IncrementTimerButtonProps {
  onTimerIncrement: (amount: number) => void;
  minutesToIncrement: number;
}

export default function IncrementTimerButton({
  onTimerIncrement,
  minutesToIncrement,
}: IncrementTimerButtonProps) {
  function handleTimeIncrement() {
    onTimerIncrement(minutesToIncrement);
  }

  return <ActionButton onClick={handleTimeIncrement}>+{minutesToIncrement} Minutes</ActionButton>;
}
