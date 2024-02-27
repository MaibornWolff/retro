import React, { PropsWithChildren, useEffect, useState } from "react";
import { PaletteMode, responsiveFontSizes, Theme, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LocalStorage } from "../utils/localStorage";
import { themes } from "./themes";

export interface ThemeContextValues {
  currentTheme: Theme;
  setTheme: (theme: PaletteMode) => void;
}

export const ThemeContext = React.createContext<ThemeContextValues>(undefined!);

export function ThemeContextProvider(props: PropsWithChildren) {
  const defaultPaletteMode: PaletteMode = useMediaQuery("(prefers-color-scheme: dark)")
    ? "dark"
    : "light";
  const [paletteMode, setPaletteMode] = useState<PaletteMode>(defaultPaletteMode);
  const theme = themes[paletteMode];

  useEffect(() => {
    if (LocalStorage.getThemePreference()) return;
    setPaletteMode(defaultPaletteMode);
  }, [defaultPaletteMode, paletteMode]);

  useLocalStorage(() => {
    setPaletteMode(LocalStorage.getThemePreference() ?? defaultPaletteMode);
  });

  function setTheme(theme: PaletteMode) {
    setPaletteMode(theme);
    LocalStorage.setThemePreference(theme);
  }

  const contextValues = {
    currentTheme: theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValues}>
      <ThemeProvider theme={responsiveFontSizes(theme)}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
