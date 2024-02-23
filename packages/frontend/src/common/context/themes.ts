import { createTheme, Theme, ThemeOptions } from "@mui/material";
import { RetroPaletteMode } from "../../../mui.types";

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

export const themes: Record<RetroPaletteMode, Theme> = {
  light: createTheme({
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
    typography: {
      ...typography,
    },
    components: {
      ...components,
    },
  }),
  dark: createTheme({
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
  }),
};
