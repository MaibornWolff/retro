import React from "react";
import { Slider } from "@mui/material";
import { getTShirtSizesMarks } from "../../utils/pokerUtils";

interface PokerTShirtSliderProps {
  onChange: (event: any, newValue: number | number[]) => void;
}

export function PokerTShirtSlider(props: PokerTShirtSliderProps) {
  return (
    <Slider
      color="primary"
      defaultValue={0}
      onChange={props.onChange}
      aria-labelledby="vote-slider-label"
      step={null}
      marks={getTShirtSizesMarks()}
      min={0}
      max={5}
    />
  );
}
