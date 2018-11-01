import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Router } from "@reach/router";

import Retro from "./Retro";
import Home from "./Home";
import Board from "./Board";
import { AppProvider } from "./App.context";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      light: "#56c8d8",
      main: "#0097a7",
      dark: "#006978",
      contrastText: "#ffffff"
    },
    secondary: {
      light: "#ff79b0",
      main: "#ff4081",
      dark: "#c60055",
      contrastText: "#ffffff"
    }
  }
});

const App = () => (
  <AppProvider>
    <MuiThemeProvider theme={theme}>
      <Router>
        <Retro path="/">
          <Home path="/" />
          <Board path="/boards/:boardId" />
        </Retro>
      </Router>
    </MuiThemeProvider>
  </AppProvider>
);

export default App;
