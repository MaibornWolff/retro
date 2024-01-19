"use client";
import React, { useState } from "react";
import { createTheme, Theme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

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
  }

  interface Palette {
    highlightColorPrimary: string;
    highlightColorSecondary: string;
  }
}

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#303030",
    },
    secondary: {
      main: "#00b4f0",
    },
    background: {
      default: "#B0BEC5",
      paper: "#CFD8DC",
    },
    highlightColorPrimary: "#f05a96",
    highlightColorSecondary: "#82c864",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#EFEFEF",
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
    <ColorThemeContext.Provider value={contextValues}>
      <ThemeProvider theme={currentTheme}>{props.children}</ThemeProvider>
    </ColorThemeContext.Provider>
  );
}
