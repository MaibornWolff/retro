import React, { MutableRefObject, useContext, useRef } from "react";

interface ExportRetroContextProviderProps {
  children?: React.ReactNode;
}

export interface ExportRetroContextValues {
  boardRef: MutableRefObject<HTMLDivElement | null>;
}

export const ExportRetroContext = React.createContext<ExportRetroContextValues>(undefined!);

export function ExportRetroContextProvider(props: ExportRetroContextProviderProps) {
  const boardRef = useRef<HTMLDivElement>(null);

  const value: ExportRetroContextValues = {
    boardRef,
  };

  return <ExportRetroContext.Provider value={value}>{props.children}</ExportRetroContext.Provider>;
}

export function useExportRetroContext() {
  return useContext(ExportRetroContext);
}
