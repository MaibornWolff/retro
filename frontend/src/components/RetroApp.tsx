import React from "react";
import ColorThemeContextProvider from "../context/ColorThemeContext";
import App from "./App";

export default function RetroApp() {
  return (
    <ColorThemeContextProvider>
      <App />
    </ColorThemeContextProvider>
  );
}
