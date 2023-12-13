import React from "react";
import { ActionButton } from "../../../common/components/buttons/ActionButton";

interface IncrementTimerButtonProps {
  onTimerIncrement: (amount: number) => void;
  incrementAmount: number;
  label: string;
}
export default function IncrementTimerButton({
  onTimerIncrement,
  incrementAmount,
  label,
}: IncrementTimerButtonProps) {
  return (
    <ActionButton
      label={label}
      onClick={() => {
        onTimerIncrement(incrementAmount);
      }}
    />
  );
}
