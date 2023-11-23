import React, { useState } from "react";

interface useValidatedTimeInputOptions {
  formatLength?: number;
  minValue?: number;
  maxValue?: number;
  initialValue?: number;
}
export function useValidatedTimeInput(options: useValidatedTimeInputOptions | undefined = {}) {
  const [value, setValue] = useState(options.initialValue ?? 0);
  const [formatedValue, setFormatedValue] = useState(
    options.initialValue ? addLeadingZeros(options.initialValue) : addLeadingZeros(0)
  );
  const [isError, setIsError] = useState(false);

  function addLeadingZeros(value: number) {
    if (options.formatLength) {
      return ("0".repeat(options.formatLength) + value.toString()).slice(-options.formatLength);
    } else {
      return value;
    }
  }

  function getAsNumber(input: string) {
    return Number(input);
  }

  function isNumber(input: string) {
    return !isNaN(parseFloat(input));
  }

  function isValid(input: number) {
    if (!options) return true;

    const { minValue = Number.MIN_VALUE, maxValue = Number.MAX_VALUE } = options;
    return input >= minValue && input <= maxValue;
  }
  function changeValue(value: number) {
    setValue(value);
    setFormatedValue(addLeadingZeros(value));
    setIsError(!isValid(value));
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!isNumber(event.target.value)) {
      setIsError(true);
      return;
    }
    const number = getAsNumber(event.target.value);
    changeValue(number);
  }

  return {
    value,
    formatedValue,
    isError,
    setIsError,
    handleChange,
    changeValue,
    isValid: isValid(value),
  };
}
