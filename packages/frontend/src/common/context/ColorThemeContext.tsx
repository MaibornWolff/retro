import React, { useState } from "react";
import { createTheme, Theme } from "@mui/material";

interface Props {
  children?: React.ReactNode;
}

export interface ColorThemeContextValues {
  currentTheme: Theme;
  setDarkTheme: () => void;
  setLightTheme: () => void;
}

declare module "@mui/material/styles" {
  interface PaletteOptions {
    highlightColorPrimary: string;
    highlightColorSecondary: string;
    highlightColorTertiary: string;
  }
  interface Palette {
    highlightColorPrimary: string;
    highlightColorSecondary: string;
    highlightColorTertiary: string;
  }
}

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#383b3e",
    },
    secondary: {
      main: "#F9FBFF",
    },
    highlightColorPrimary: "#b41964",
    highlightColorSecondary: "#14b400",
    highlightColorTertiary: "#00b4f0",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#b41964",
    },
    background: {
      default: "#191c38",
      paper: "#191c38",
    },
    highlightColorPrimary: "#b41964",
    highlightColorSecondary: "#14b400",
    highlightColorTertiary: "#00b4f0",
  },
});

export const ColorThemeContext = React.createContext<ColorThemeContextValues>(undefined!);

export function ColorThemeContextProvider(props: Props) {
  const [currentTheme, setCurrentTheme] = useState(darkTheme);

  function setDarkTheme() {
    setCurrentTheme(darkTheme);
  }

  function setLightTheme() {
    setCurrentTheme(lightTheme);
  }

  const contextValues = {
    currentTheme,
    setDarkTheme,
    setLightTheme,
  };

  return (
    <ColorThemeContext.Provider value={contextValues}>{props.children}</ColorThemeContext.Provider>
  );
}
