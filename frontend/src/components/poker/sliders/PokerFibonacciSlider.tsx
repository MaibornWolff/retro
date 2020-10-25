import React from "react";
import { Slider } from "@material-ui/core";
import { getFibonacciMarks } from "../../../utils/poker.utils";

interface PokerFibonacciSliderProps {
  maxValue: number;
  onChange: (event: any, newValue: number | number[]) => void;
  valueText: (value: number) => string;
}

export function PokerFibonacciSlider(props: PokerFibonacciSliderProps) {
  return (
    <Slider
      color="primary"
      defaultValue={0}
      onChange={props.onChange}
      getAriaValueText={props.valueText}
      aria-labelledby="vote-slider-label"
      step={null}
      valueLabelDisplay="auto"
      marks={getFibonacciMarks(props.maxValue)}
      min={0}
      max={props.maxValue}
    />
  );
}
