import React from "react";
import { AppProps } from "next/app";
import "../index.css";
import { ErrorContextProvider } from "../common/context/ErrorContext";
import { ColorThemeContextProvider } from "../common/context/ColorThemeContext";
import { CssBaseline } from "@mui/material";
import Footer from "../common/components/Footer";
import MainContainer from "../common/components/MainContainer";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorContextProvider>
      <ColorThemeContextProvider>
        <CssBaseline />
        <MainContainer>
          <Component {...pageProps} />
        </MainContainer>
        <Footer />
      </ColorThemeContextProvider>
    </ErrorContextProvider>
  );
};

export default MyApp;
