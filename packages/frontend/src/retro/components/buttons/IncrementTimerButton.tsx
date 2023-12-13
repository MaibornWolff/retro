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
  return (
    <ActionButton
      label={`+${minutesToIncrement} Minutes`}
      onClick={() => {
        onTimerIncrement(minutesToIncrement);
      }}
    />
  );
}
