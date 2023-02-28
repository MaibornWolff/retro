import React, { Dispatch, SetStateAction, useContext, useState } from "react";

interface ErrorContextProviderProps {
  children?: React.ReactNode;
}

export interface ErrorContextValues {
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
}

export const ErrorContext = React.createContext<ErrorContextValues>(undefined!);

export default function ErrorContextProvider(props: ErrorContextProviderProps) {
  const [isError, setIsError] = useState(false);

  const value: ErrorContextValues = {
    isError,
    setIsError,
  };

  return <ErrorContext.Provider value={value}>{props.children}</ErrorContext.Provider>;
}

export function useErrorContext() {
  return useContext(ErrorContext);
}
