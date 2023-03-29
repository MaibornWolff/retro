import React from "react";
import { Slider } from "@mui/material";

interface PokerNaturalNumbersSliderProps {
  maxValue: number;
  onChange: (event: any, newValue: number | number[]) => void;
  valueText: (value: number) => string;
}

export function PokerNaturalNumbersSlider(props: PokerNaturalNumbersSliderProps) {
  return (
    <Slider
      defaultValue={0}
      onChange={props.onChange}
      getAriaValueText={props.valueText}
      aria-labelledby="vote-slider-label"
      valueLabelDisplay="auto"
      max={props.maxValue}
    />
  );
}
