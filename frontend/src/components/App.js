import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Router } from "@reach/router";

import { AppContextProvider } from "./AppContext";
import Retro from "./Retro";
import Home from "./Home";
import Board from "./Board";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "#2a3132",
      light: "#535a5b",
      dark: "#00090a",
      contrastText: "#fff"
    },
    secondary: {
      main: "#44777e",
      light: "#73a6ad",
      dark: "#134b52",
      contrastText: "#fff"
    }
  }
});

const App = () => (
  <AppContextProvider>
    <MuiThemeProvider theme={theme}>
      <Router>
        <Retro path="/">
          <Home path="/" />
          <Board path="/boards/:boardId" />
        </Retro>
      </Router>
    </MuiThemeProvider>
  </AppContextProvider>
);

export default App;
