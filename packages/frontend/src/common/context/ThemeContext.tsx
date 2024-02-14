import React, { PropsWithChildren, useState } from "react";
import { createTheme, responsiveFontSizes, Theme, ThemeOptions } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

export interface ThemeContextValues {
  currentTheme: Theme;
  setDarkTheme: () => void;
  setLightTheme: () => void;
}

const components: ThemeOptions["components"] = {
  MuiTypography: {
    defaultProps: {
      variantMapping: {
        title: "h1",
        menuTitle: "span",
        label: "div",
      },
    },
  },
};
const typography: ThemeOptions["typography"] = {
  htmlFontSize: 16,
  h1: {
    fontSize: "4rem",
  },
  h2: {
    fontSize: "3rem",
  },
  h3: {
    fontSize: "2rem",
  },
  h4: {
    fontSize: "1.8rem",
  },
  title: {
    fontSize: "2.125rem",
    fontWeight: "400",
  },
  menuTitle: {
    fontSize: "2.125rem",
    fontFamily: "Permanent Marker, cursive",
  },
  label: {
    fontSize: "1.25rem",
  },
};
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
  ...typography,
  ...components,
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
  typography: {
    ...typography,
  },
  components: {
    ...components,
  },
});

export const ThemeContext = React.createContext<ThemeContextValues>(undefined!);

export function ThemeContextProvider(props: PropsWithChildren) {
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
    <ThemeContext.Provider value={contextValues}>
      <ThemeProvider theme={responsiveFontSizes(currentTheme)}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
