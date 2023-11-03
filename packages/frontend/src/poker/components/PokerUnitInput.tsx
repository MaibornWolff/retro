import React, { ChangeEvent } from "react";
import { FormControl, MenuItem, Slider, TextField, Typography } from "@mui/material";
import { PokerUnitType } from "../types/pokerTypes";

interface PokerUnitInputProps {
  pokerUnit: PokerUnitType;
  unitRange: number;
  onUnitChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFibRangeChange: (event: Event, newValue: number | number[]) => void;
}

export function PokerUnitInput({
  pokerUnit,
  unitRange,
  onUnitChange,
  onFibRangeChange,
}: PokerUnitInputProps) {
  const showRangeSlider = pokerUnit !== "tshirt";

  return (
    <>
      <TextField
        select
        id="poker-unit-select"
        value={pokerUnit}
        onChange={onUnitChange}
        label="Poker Unit"
        fullWidth
        sx={{ my: 2 }}
      >
        <MenuItem value="fibonacci">Fibonacci</MenuItem>
        <MenuItem value="tshirt">T-Shirt Size</MenuItem>
        <MenuItem value="naturalnumbers">Natural Numbers</MenuItem>
      </TextField>
      {showRangeSlider && (
        <FormControl fullWidth>
          <Typography id="range-slider" gutterBottom>
            Choose your maximum value
          </Typography>
          <Slider
            value={unitRange}
            onChange={onFibRangeChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={getValueText}
          />
        </FormControl>
      )}
    </>
  );
}

function getValueText(value: number) {
  return `${value}`;
}
