import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import HomePage from "./home/HomePage";
import BoardPage from "./board/BoardPage";
import PokerPage from "./poker/PokerPage";
import ErrorPage from "./ErrorPage";
import BoardContextProvider from "../context/BoardContext";
import UserContextProvider from "../context/UserContext";
import DialogContextProvider from "../context/DialogContext";
import PokerContextProvider from "../context/PokerContext";
import { grey } from "@material-ui/core/colors";

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#424956",
      light: "#6d7483",
      dark: "#1b222d",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#8452bb",
      light: "#b680ee",
      dark: "#53268a",
      contrastText: "#ffffff",
    },
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: grey["100"],
    },
    secondary: {
      main: grey["800"],
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route
            exact
            path="/boards/:boardId"
            render={() => (
              <UserContextProvider>
                <BoardContextProvider>
                  <DialogContextProvider>
                    <BoardPage />
                  </DialogContextProvider>
                </BoardContextProvider>
              </UserContextProvider>
            )}
          />
          <Route
            exact
            path="/poker/:pokerId"
            render={() => (
              <PokerContextProvider>
                <PokerPage />
              </PokerContextProvider>
            )}
          />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
