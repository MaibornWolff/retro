import { usePokerContext } from "../context/PokerContext";
import { ChangeEvent, useState } from "react";
import { PokerUnitType } from "../types/pokerTypes";

export function usePokerUnit() {
  const { pokerState } = usePokerContext();
  const [pokerUnit, setPokerUnit] = useState(pokerState.pokerUnit.unitType);
  const [unitRange, setUnitRange] = useState<number>(pokerState.pokerUnit.unitRangeHigh);

  function handleUnitChange(event: ChangeEvent<HTMLInputElement>) {
    setPokerUnit(event.target.value as PokerUnitType);
  }

  function handleFibRangeChange(event: Event, newValue: number | number[]) {
    setUnitRange(newValue as number);
  }

  return { pokerUnit, unitRange, handleUnitChange, handleFibRangeChange };
}
