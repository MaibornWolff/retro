import React, { useState } from "react";
import { toNumber } from "lodash";

interface useValidatedTimeInputOptions {
  initialValue?: number;
  formatLength?: number;
  minValue?: number;
  maxValue?: number;
}
export function useValidatedTimeInput({
  initialValue,
  formatLength,
  maxValue = Number.MAX_VALUE,
  minValue = Number.MIN_VALUE,
}: useValidatedTimeInputOptions | undefined = {}) {
  const [value, setValue] = useState(initialValue ?? 0);
  const formattedValue = addLeadingZeros(value);
  const [isError, setIsError] = useState(false);

  function addLeadingZeros(value: number) {
    if (formatLength) {
      return value.toString().padStart(formatLength, "0");
    }
    return value.toString();
  }
  function incrementTime(change: number) {
    changeValue(value + change);
  }
  function decrementTime(change: number) {
    changeValue(value - change);
  }
  function isValid() {
    return value >= minValue && value <= maxValue;
  }
  function changeValue(value: number) {
    setValue(value);
    setIsError(!isValid());
  }
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const number = toNumber(event.target.value);
    if (Number.isNaN(number)) {
      setIsError(true);
      return;
    }
    changeValue(number);
  }

  return {
    value,
    formattedValue,
    isError,
    onChange,
    incrementTime,
    decrementTime,
  };
}
