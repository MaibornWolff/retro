import React from "react";
import { ColorThemeContextProvider } from "../common/context/ColorThemeContext";
import { App } from "../App";

export function RetroApp() {
  return (
    <ColorThemeContextProvider>
      <App />
    </ColorThemeContextProvider>
  );
}
