import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { FormControl, NativeSelect } from "@mui/material";
import { RetroFormatOptions } from "./RetroFormatOptions";

interface RetroFormatSelectProps {
  onFormatChange: Dispatch<SetStateAction<string>>;
  format: string;
}

export function RetroFormatSelect({ onFormatChange, format }: RetroFormatSelectProps) {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const newFormat = event.target.value;
    onFormatChange(newFormat);
  }

  return (
    <FormControl fullWidth>
      <NativeSelect
        value={format}
        onChange={handleChange}
        inputProps={{
          name: "format",
          id: "retro-format-native-helper",
        }}
      >
        <RetroFormatOptions />
      </NativeSelect>
    </FormControl>
  );
}
