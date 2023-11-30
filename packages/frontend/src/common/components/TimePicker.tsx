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

interface TimePickerProps {
  formattedMinutes: string;
  formattedSeconds: string;
  isEditable: boolean;
  isMinutesError: boolean;
  isSecondsError: boolean;
  onSecondsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMinutesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMinutesIncrement: (change: number) => void;
  onMinutesDecrement: (change: number) => void;
}
export function TimePicker({
  formattedMinutes,
  formattedSeconds,
  isEditable,
  isMinutesError,
  isSecondsError,
  onSecondsChange,
  onMinutesChange,
  onMinutesIncrement,
  onMinutesDecrement,
}: TimePickerProps) {
  // TO-DO: Live changes of running timer
  return (
    <FlexBox>
      <FormControl>
        <IconButton
          onClick={() => {
            onMinutesDecrement(1);
          }}
          size="small"
        >
          <Remove />
        </IconButton>
      </FormControl>
      <FormControl variant="filled">
        <TextField
          value={formattedMinutes}
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
          value={formattedSeconds}
          onChange={onSecondsChange}
          required
          size="small"
          type="tel"
          disabled={!isEditable}
          error={isSecondsError}
        />
        <FormHelperText>Seconds</FormHelperText>
      </FormControl>
      <FormControl>
        <IconButton
          onClick={() => {
            onMinutesIncrement(1);
          }}
          size="small"
        >
          <Add />
        </IconButton>
      </FormControl>
    </FlexBox>
  );
}
