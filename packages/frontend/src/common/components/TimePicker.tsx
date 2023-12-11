import React from "react";
import { FlexBox } from "./FlexBox";
import { TextInput } from "./TextInput";

interface TimePickerProps {
  minutes: string;
  seconds: string;
  isEditable: boolean;
  isMinutesError: boolean;
  isSecondsError: boolean;
  onSecondsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMinutesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter: () => void;
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
}: TimePickerProps) {
  return (
    <FlexBox sx={{ columnGap: "2%" }}>
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
  );
}
