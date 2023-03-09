import React from "react";
import ColorThemeContextProvider from "../common/context/ColorThemeContext";
import App from "../App";
import { Provider } from "react-redux";
import { store } from "../store";

export default function RetroApp() {
  return (
    <ColorThemeContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ColorThemeContextProvider>
  );
}
