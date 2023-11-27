import React, { useState } from "react";
import { isNumber } from "lodash";

interface useValidatedTimeInputOptions {
  formatLength?: number;
  minValue?: number;
  maxValue?: number;
  initialValue?: number;
}
export function useValidatedTimeInput(options: useValidatedTimeInputOptions | undefined = {}) {
  const [value, setValue] = useState(options.initialValue ?? 0);
  const formattedValue = addLeadingZeros(value);
  const [isError, setIsError] = useState(false);

  function addLeadingZeros(value: number) {
    if (options.formatLength) {
      return ("0".repeat(options.formatLength) + value.toString()).slice(-options.formatLength);
    }
    return value;
  }

  function isValid() {
    if (!options) return true;

    const { minValue = Number.MIN_VALUE, maxValue = Number.MAX_VALUE } = options;
    return value >= minValue && value <= maxValue;
  }
  function changeValue(value: number) {
    setValue(value);
    setIsError(!isValid());
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!isNumber(event.target.value)) {
      setIsError(true);
      return;
    }
    const number = Number(event.target.value);
    changeValue(number);
  }

  return {
    value,
    formattedValue,
    isError,
    setIsError,
    handleChange,
    changeValue,
    isValid,
  };
}
