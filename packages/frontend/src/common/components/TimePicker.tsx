import React from "react";
import {
  FormControl,
  FormHelperText,
  IconButton,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { FlexBox } from "./FlexBox";
import { useValidatedTimeInput } from "../hooks/useValidatedTimeInput";

interface TimePickerProps {
  minutes: number;
  seconds: number;
  isEditable: boolean;
}
export function TimePicker({ minutes, seconds, isEditable }: TimePickerProps) {
  const {
    formattedValue: formattedSeconds,
    isError: isSecondsError,
    handleChange: handleSecondsChange,
  } = useValidatedTimeInput({
    formatLength: 2,
    maxValue: 60,
    minValue: 0,
    initialValue: seconds,
  });

  const {
    formattedValue: formattedMinutes,
    isError: isMinutesError,
    handleChange: handleMinutesChange,
    changeValue: changeMinutes,
  } = useValidatedTimeInput({
    formatLength: 2,
    minValue: 0,
    maxValue: 99,
    initialValue: minutes,
  });

  function handleIncrementClick() {
    changeMinutes(minutes + 1);
  }
  function handleDecrementClick() {
    changeMinutes(minutes - 1);
  }
  // TO-DO: Live changes of running timer
  return (
    <FlexBox>
      <FormControl>
        <IconButton onClick={handleDecrementClick} size="small">
          <Remove />
        </IconButton>
      </FormControl>
      <FormControl variant="filled">
        <TextField
          value={formattedMinutes}
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
      <Typography variant="caption">:</Typography>
      <FormControl variant="filled">
        <OutlinedInput
          value={formattedSeconds}
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
        <IconButton onClick={handleIncrementClick} size="small">
          <Add />
        </IconButton>
      </FormControl>
    </FlexBox>
  );
}
