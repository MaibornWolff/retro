"use client";

import React, { useContext } from "react";
import { ApplicationConfiguration } from "@shared/configuration";

interface ConfigurationContextProviderProps {
  configuration: ApplicationConfiguration;
  children?: React.ReactNode;
}

export const ConfigurationContext = React.createContext<ApplicationConfiguration>(undefined!);

export function ConfigurationContextProvider({
  configuration,
  children,
}: ConfigurationContextProviderProps) {
  return (
    <ConfigurationContext.Provider value={configuration}>{children}</ConfigurationContext.Provider>
  );
}

export function useConfigurationContext() {
  return useContext(ConfigurationContext);
}
