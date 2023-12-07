import React from "react";
import { FormControl, FormHelperText, OutlinedInput, TextField, Typography } from "@mui/material";
import { FlexBox } from "./FlexBox";

interface TimePickerProps {
  minutes: string;
  seconds: string;
  isEditable: boolean;
  isMinutesError: boolean;
  isSecondsError: boolean;
  onSecondsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMinutesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export function TimePicker({
  minutes,
  seconds,
  isEditable,
  isMinutesError,
  isSecondsError,
  onSecondsChange,
  onMinutesChange,
}: TimePickerProps) {
  return (
    <FlexBox>
      <FormControl variant="filled">
        <TextField
          value={minutes}
          onChange={onMinutesChange}
          autoFocus
          required
          disabled={!isEditable}
          size="small"
          type="tel"
          error={isMinutesError}
        />
        <FormHelperText>Minutes</FormHelperText>
      </FormControl>
      <Typography variant="caption">:</Typography>
      <FormControl variant="filled">
        <OutlinedInput
          value={seconds}
          onChange={onSecondsChange}
          required
          size="small"
          type="tel"
          disabled={!isEditable}
          error={isSecondsError}
        />
        <FormHelperText>Seconds</FormHelperText>
      </FormControl>
    </FlexBox>
  );
}
