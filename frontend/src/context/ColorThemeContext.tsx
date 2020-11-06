import React, { useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { ColorThemeContextValues } from "../types/context.types";

type Props = {
  children?: React.ReactNode;
};

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: grey["900"],
    },
    secondary: {
      main: grey["900"],
    },
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: grey["100"],
    },
    secondary: {
      main: grey["800"],
    },
  },
});

export const ColorThemeContext = React.createContext<ColorThemeContextValues>(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  undefined!
);

export default function ColorThemeContextProvider(props: Props) {
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
      {props.children}
    </ColorThemeContext.Provider>
  );
}
