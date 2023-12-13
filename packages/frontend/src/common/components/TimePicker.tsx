import React from "react";
import { FlexBox } from "./FlexBox";
import { TextInput } from "./TextInput";
import IncrementTimerButton from "../../retro/components/buttons/IncrementTimerButton";
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
        <IncrementTimerButton
          label={"+1 Minutes"}
          onTimerIncrement={onTimerIncrement}
          incrementAmount={1}
        />
        <IncrementTimerButton
          label={"+3 Minutes"}
          onTimerIncrement={onTimerIncrement}
          incrementAmount={3}
        />
        <IncrementTimerButton
          label={"+5 Minutes"}
          onTimerIncrement={onTimerIncrement}
          incrementAmount={5}
        />
      </FlexBox>
    </>
  );
}
