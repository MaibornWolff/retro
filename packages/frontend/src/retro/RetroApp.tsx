import React from "react";
import ColorThemeContextProvider from "../common/context/ColorThemeContext";
import App from "../App";

export default function RetroApp() {
  return (
    <ColorThemeContextProvider>
      <App />
    </ColorThemeContextProvider>
  );
}
