import React, { useContext } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";

import HomePage from "./home/HomePage";
import BoardPage from "./board/BoardPage";
import PokerPage from "./poker/PokerPage";
import ErrorPage from "./ErrorPage";
import BoardContextProvider from "../context/BoardContext";
import UserContextProvider from "../context/UserContext";
import DialogContextProvider from "../context/DialogContext";
import PokerContextProvider from "../context/PokerContext";
import { ColorThemeContext } from "../context/ColorThemeContext";

export default function App() {
  const { currentTheme } = useContext(ColorThemeContext);

  return (
    <ThemeProvider theme={currentTheme}>
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
