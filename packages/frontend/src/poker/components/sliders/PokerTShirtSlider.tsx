import React from "react";
import { Slider } from "@mui/material";
import { getTShirtSizesMarks } from "../../utils/pokerUtils";

interface PokerTShirtSliderProps {
  onChange: (event: Event, newValue: number | number[]) => void;
}

export function PokerTShirtSlider({ onChange }: PokerTShirtSliderProps) {
  return (
    <Slider
      defaultValue={0}
      onChange={onChange}
      aria-labelledby="vote-slider-label"
      step={null}
      marks={getTShirtSizesMarks()}
      min={0}
      max={5}
    />
  );
}
