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

const lightTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#E1E1DD",
          backgroundImage: `linear-gradient(19deg, #E1E1DD 0%, #F9FBFF 50%)`,
        },
      },
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#383b3e",
    },
    secondary: {
      main: "#F9FBFF",
    },
  },
});

const darkTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: `linear-gradient(19deg, #212121 0%, #1e194b 100%)`,
        },
      },
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#1e194b",
    },
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
