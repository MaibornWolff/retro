import React from "react";
import { FlexBox } from "../../common/components/FlexBox";
import { TextInput } from "../../common/components/TextInput";
import IncrementTimerButton from "./buttons/IncrementTimerButton";

interface TimePickerProps {
  minutes: string;
  seconds: string;
  disabled: boolean;
  isMinutesError: boolean;
  isSecondsError: boolean;
  onSecondsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMinutesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onTimerIncrement: (increment: number) => void;
}

export function TimePicker({
  minutes,
  seconds,
  disabled,
  isMinutesError,
  isSecondsError,
  onSecondsChange,
  onMinutesChange,
  onSubmit,
  onTimerIncrement,
}: TimePickerProps) {
  return (
    <>
      <FlexBox gap={2}>
        <TextInput
          value={minutes}
          onChange={onMinutesChange}
          onSubmit={onSubmit}
          autoFocus
          required
          disabled={disabled}
          type="tel"
          error={isMinutesError}
          label="Minutes"
        />
        <TextInput
          value={seconds}
          onChange={onSecondsChange}
          onSubmit={onSubmit}
          required
          type="tel"
          disabled={disabled}
          error={isSecondsError}
          label="Seconds"
        />
      </FlexBox>
      <FlexBox>
        <IncrementTimerButton onTimerIncrement={onTimerIncrement} minutesToIncrement={1} />
        <IncrementTimerButton onTimerIncrement={onTimerIncrement} minutesToIncrement={3} />
        <IncrementTimerButton onTimerIncrement={onTimerIncrement} minutesToIncrement={5} />
      </FlexBox>
    </>
  );
}
