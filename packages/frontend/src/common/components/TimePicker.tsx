import React from "react";
import { FlexBox } from "./FlexBox";
import { TextInput } from "./TextInput";
import { ActionButton } from "./buttons/ActionButton";
interface TimePickerProps {
  minutes: string;
  seconds: string;
  isEditable: boolean;
  isMinutesError: boolean;
  isSecondsError: boolean;
  onSecondsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMinutesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter: () => void;
  onTimeIncrement: (increment: number) => void;
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
  onTimeIncrement,
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
        <ActionButton
          label="+1 Minutes"
          onClick={() => {
            onTimeIncrement(1);
          }}
        />
        <ActionButton
          label="+3 Minutes"
          onClick={() => {
            onTimeIncrement(3);
          }}
        />
        <ActionButton
          onClick={() => {
            onTimeIncrement(5);
          }}
          label="+5 Minutes"
        />
      </FlexBox>
    </>
  );
}
