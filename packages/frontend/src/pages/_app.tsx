import React from "react";
import { AppProps } from "next/app";
import "../index.css";
import { ErrorContextProvider } from "../common/context/ErrorContext";
import { ThemeContextProvider } from "../common/context/ThemeContext";
import { CssBaseline } from "@mui/material";
import Footer from "../common/components/Footer";
import MainContainer from "../common/components/MainContainer";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorContextProvider>
      <ThemeContextProvider>
        <CssBaseline />
        <MainContainer>
          <Component {...pageProps} />
        </MainContainer>
        <Footer />
      </ThemeContextProvider>
    </ErrorContextProvider>
  );
};

export default MyApp;
