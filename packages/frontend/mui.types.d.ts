import React from "react";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    highlightColorPrimary: string;
    highlightColorSecondary: string;
  }

  interface Palette {
    highlightColorPrimary: string;
    highlightColorSecondary: string;
  }

  interface TypographyVariants {
    title: React.CSSProperties;
    menuTitle: React.CSSProperties;
    label: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    title?: React.CSSProperties;
    menuTitle?: React.CSSProperties;
    label?: React.CSSProperties;
  }
}
// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    title: true;
    menuTitle: true;
    label: true;
  }
}

export type RetroPaletteMode = "highContrast" | PaletteMode;
