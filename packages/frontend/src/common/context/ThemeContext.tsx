import React, { PropsWithChildren, useMemo, useState } from "react";
import { responsiveFontSizes, Theme, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LocalStorage } from "../utils/localStorage";
import { RetroPaletteMode } from "../../../mui.types";
import { themes } from "./themes";

export interface ThemeContextValues {
  currentTheme: Theme;
  setTheme: (theme: RetroPaletteMode) => void;
}

export const ThemeContext = React.createContext<ThemeContextValues>(undefined!);

export function ThemeContextProvider(props: PropsWithChildren) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeChoice, setThemeChoice] = useState<RetroPaletteMode | undefined>(undefined);

  const currentTheme: Theme = useMemo(() => {
    if (themeChoice === undefined || themes[themeChoice] === undefined) {
      return prefersDarkMode ? (themes["dark"] as Theme) : (themes["light"] as Theme);
    }
    return themes[themeChoice] as Theme;
  }, [prefersDarkMode, themeChoice]);

  useLocalStorage(() => {
    setThemeChoice(LocalStorage.getThemePreference());
  });

  function setTheme(theme: RetroPaletteMode) {
    setThemeChoice(theme);
    LocalStorage.setThemePreference(theme);
  }

  const contextValues = {
    currentTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValues}>
      <ThemeProvider theme={responsiveFontSizes(currentTheme)}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
