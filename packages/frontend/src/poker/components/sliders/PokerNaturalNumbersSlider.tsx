import React from "react";
import { Slider } from "@mui/material";

interface PokerNaturalNumbersSliderProps {
  maxValue: number;
  onChange: (event: Event, newValue: number | number[]) => void;
  valueText: (value: number) => string;
}

export function PokerNaturalNumbersSlider({
  onChange,
  valueText,
  maxValue,
}: PokerNaturalNumbersSliderProps) {
  return (
    <Slider
      defaultValue={0}
      onChange={onChange}
      getAriaValueText={valueText}
      aria-labelledby="vote-slider-label"
      valueLabelDisplay="auto"
      max={maxValue}
    />
  );
}
