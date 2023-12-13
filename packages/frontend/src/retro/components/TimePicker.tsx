import React from "react";
import { FlexBox } from "../../common/components/FlexBox";
import { TextInput } from "../../common/components/TextInput";
import IncrementTimerButton from "./buttons/IncrementTimerButton";
interface TimePickerProps {
  minutes: string;
  seconds: string;
  isEditable: boolean;
  isMinutesError: boolean;
  isSecondsError: boolean;
  onSecondsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMinutesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter: () => void;
  onTimerIncrement: (increment: number) => void;
}
export function TimePicker({
  minutes,
  seconds,
  isEditable,
  isMinutesError,
  isSecondsError,
  onSecondsChange,
  onMinutesChange,
  onEnter,
  onTimerIncrement,
}: TimePickerProps) {
  return (
    <>
      <FlexBox gap={2}>
        <TextInput
          value={minutes}
          onChange={onMinutesChange}
          onSubmit={onEnter}
          autoFocus
          required
          disabled={!isEditable}
          type="tel"
          error={isMinutesError}
          label="Minutes"
        />
        <TextInput
          value={seconds}
          onChange={onSecondsChange}
          onSubmit={onEnter}
          required
          type="tel"
          disabled={!isEditable}
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
