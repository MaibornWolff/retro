import React, { useState } from "react";
import { createTheme, Theme } from "@mui/material";
import { grey } from "@mui/material/colors";

interface Props {
  children?: React.ReactNode;
}

export interface ColorThemeContextValues {
  currentTheme: Theme;
  setDarkTheme: () => void;
  setLightTheme: () => void;
}

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: grey["900"],
    },
    secondary: {
      main: grey["900"],
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: grey["100"],
    },
    secondary: {
      main: grey["800"],
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
