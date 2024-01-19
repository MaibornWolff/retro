"use client";
import React, { Dispatch, SetStateAction, useCallback, useContext, useState } from "react";
import { ErrorState } from "../types/commonTypes";

interface ErrorContextProviderProps {
  children?: React.ReactNode;
}

export interface ErrorContextValues {
  error?: ErrorState;
  setError: Dispatch<SetStateAction<ErrorState | undefined>>;
  resetError: () => void;
}

export const ErrorContext = React.createContext<ErrorContextValues>(undefined!);

export function ErrorContextProvider(props: ErrorContextProviderProps) {
  const [error, setError] = useState<ErrorState | undefined>(undefined);

  const resetError = useCallback(() => {
    setError(undefined);
  }, []);

  const value: ErrorContextValues = {
    error,
    setError,
    resetError,
  };

  return <ErrorContext.Provider value={value}>{props.children}</ErrorContext.Provider>;
}

export function useErrorContext() {
  return useContext(ErrorContext);
}
