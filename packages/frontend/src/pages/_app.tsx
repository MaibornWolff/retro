import React from "react";
import { AppProps } from "next/app";
import "../index.css";
import { ErrorContextProvider } from "../common/context/ErrorContext";
import { ColorThemeContextProvider } from "../common/context/ColorThemeContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorContextProvider>
      <ColorThemeContextProvider>
        <Component {...pageProps} />
      </ColorThemeContextProvider>
    </ErrorContextProvider>
  );
};

export default MyApp;
