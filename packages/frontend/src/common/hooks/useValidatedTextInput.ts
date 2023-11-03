import React, { useState } from "react";

interface UseValidatedTextInputOptions {
  minLength?: number;
  maxLength?: number;
  initialValue?: string;
}

export function useValidatedTextInput(options: UseValidatedTextInputOptions | undefined = {}) {
  const [value, setValue] = useState(options.initialValue ?? "");
  const [isError, setIsError] = useState(false);

  function isValid(input: string) {
    if (!options) return true;
    const { minLength = 0, maxLength = Number.MAX_VALUE } = options;
    return input.length >= minLength && input.length <= maxLength;
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    setIsError(!isValid(event.target.value));
  }

  return { value, setValue, isError, setIsError, handleChange, isValid: isValid(value) };
}
