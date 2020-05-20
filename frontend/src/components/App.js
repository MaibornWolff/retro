import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import Home from "./pages/Home";
import Board from "./pages/Board";
import Error from "./pages/Error";

import { BoardContextProvider } from "../context/BoardContext";
import { UserContextProvider } from "../context/UserContext";
import { DialogsContextProvider } from "../context/DialogsContext";

const theme = createMuiTheme({
  palette: {
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

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          exact
          path="/boards/:boardId"
          render={(props) => (
            <UserContextProvider {...props}>
              <BoardContextProvider {...props}>
                <DialogsContextProvider {...props}>
                  <Board {...props} />
                </DialogsContextProvider>
              </BoardContextProvider>
            </UserContextProvider>
          )}
        />
        <Route component={Error} />
      </Switch>
    </Router>
  </MuiThemeProvider>
);

export default App;
