import React from "react";
import { usePokerContext } from "../context/PokerContext";
import { PokerFibonacciSlider } from "./sliders/PokerFibonacciSlider";
import { PokerNaturalNumbersSlider } from "./sliders/PokerNaturalNumbersSlider";
import { PokerTShirtSlider } from "./sliders/PokerTShirtSlider";

interface PokerVoteSliderProps {
  onSliderChange: (event: any, newValue: number | number[]) => void;
}

export function PokerVoteSlider({ onSliderChange }: PokerVoteSliderProps) {
  const { unitType, unitRangeHigh } = usePokerContext().pokerState.pokerUnit;

  switch (unitType) {
    case "fibonacci":
      return (
        <PokerFibonacciSlider
          maxValue={unitRangeHigh}
          onChange={onSliderChange}
          valueText={valueText}
        />
      );
    case "naturalnumbers":
      return (
        <PokerNaturalNumbersSlider
          maxValue={unitRangeHigh}
          onChange={onSliderChange}
          valueText={valueText}
        />
      );
    case "tshirt":
      return <PokerTShirtSlider onChange={onSliderChange} />;
    default:
      return null;
  }
}

function valueText(value: number) {
  return `${value}`;
}
