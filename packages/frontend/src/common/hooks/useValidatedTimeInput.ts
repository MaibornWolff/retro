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
  function addLeadingZeros(value: number) {
    if (formatLength) {
      return value.toString().padStart(formatLength, "0");
    }
    return value.toString();
  }
  function incrementTime(change: number) {
    changeValue(value + change);
  }
  function changeValue(value: number) {
    setValue(value);
  }
  function trimInput(input: string) {
    if (input.length > formatLength) {
      input = input.substring(input.length - formatLength, input.length);
    }
    return input;
  }
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = trimInput(event.target.value);
    const number = toNumber(input);
    if (Number.isNaN(number)) {
      return;
    }

    changeValue(number);
  }

  return {
    value,
    formattedValue: addLeadingZeros(value),
    isError,
    onChange,
    incrementTime,
  };
}
