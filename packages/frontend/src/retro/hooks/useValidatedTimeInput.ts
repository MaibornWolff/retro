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
  formatLength = 2,
  maxValue = Number.MAX_VALUE,
  minValue = Number.MIN_VALUE,
}: useValidatedTimeInputOptions | undefined = {}) {
  const [value, setValue] = useState(initialValue ?? 0);
  const isError = value < minValue || value > maxValue;

  const formattedValue = formatLength
    ? value.toString().padStart(formatLength, "0")
    : value.toString();

  function trimInput(input: string) {
    if (input.length > formatLength) {
      return input.substring(input.length - formatLength, input.length);
    }
    return input;
  }

  function incrementTime(change: number) {
    setValue(value + change);
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = trimInput(event.target.value);
    const number = toNumber(input);

    if (Number.isNaN(number)) {
      return;
    }

    setValue(number);
  }

  return {
    value,
    formattedValue,
    isError,
    onChange,
    incrementTime,
  };
}
