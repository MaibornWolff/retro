import React from "react";
import { Slider } from "@mui/material";
import { getFibonacciMarks } from "../../utils/pokerUtils";

interface PokerFibonacciSliderProps {
  maxValue: number;
  onChange: (event: Event, newValue: number | number[]) => void;
  valueText: (value: number) => string;
}

export function PokerFibonacciSlider({ onChange, valueText, maxValue }: PokerFibonacciSliderProps) {
  return (
    <Slider
      defaultValue={0}
      onChange={onChange}
      getAriaValueText={valueText}
      aria-labelledby="vote-slider-label"
      step={null}
      valueLabelDisplay="auto"
      marks={getFibonacciMarks(maxValue)}
      min={0}
      max={maxValue}
    />
  );
}
