import React from "react";
import { FormControl, FormHelperText, IconButton, OutlinedInput, TextField } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { FlexBox } from "./FlexBox";
import { useValidatedTimeInput } from "../hooks/useValidatedTimeInput";

interface TimePickerProps {
  minutes: number;
  seconds: number;
  isEditable: boolean;
}
export function TimePicker({
  minutes: defaultMinutes,
  seconds: defaultSeconds,
  isEditable,
}: TimePickerProps) {
  const {
    formatedValue: formatedSeconds,
    isError: isSecondsError,
    handleChange: handleSecondsChange,
  } = useValidatedTimeInput({
    formatLength: 2,
    maxValue: 60,
    minValue: 0,
    initialValue: defaultSeconds,
  });

  const {
    formatedValue: formatedMinutes,
    isError: isMinutesError,
    value: minutes,
    handleChange: handleMinutesChange,
    changeValue: changeMinutes,
  } = useValidatedTimeInput({
    formatLength: 2,
    minValue: 0,
    initialValue: defaultMinutes,
  });

  function handleAddButtonClick() {
    changeMinutes(minutes + 1);
  }
  function handleRemoveButtonClick() {
    changeMinutes(minutes - 1);
  }

  return (
    <FlexBox>
      <FormControl>
        <IconButton onClick={handleRemoveButtonClick} size="small">
          <Remove />
        </IconButton>
      </FormControl>
      <FormControl variant="filled">
        <TextField
          id="timepicker-minutes"
          value={formatedMinutes}
          onChange={handleMinutesChange}
          autoFocus
          required
          disabled={isEditable}
          size="small"
          type="tel"
          error={isMinutesError}
        />
        <FormHelperText>Minutes</FormHelperText>
      </FormControl>
      <span>:</span>
      <FormControl variant="filled">
        <OutlinedInput
          id="timepicker-seconds"
          value={formatedSeconds}
          onChange={handleSecondsChange}
          required
          size="small"
          type="tel"
          disabled={isEditable}
          error={isSecondsError}
        />
        <FormHelperText>Seconds</FormHelperText>
      </FormControl>
      <FormControl>
        <IconButton onClick={handleAddButtonClick} size="small">
          <Add />
        </IconButton>
      </FormControl>
    </FlexBox>
  );
}
