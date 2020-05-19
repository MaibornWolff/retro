import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Board from "./pages/Board";
import Error from "./pages/Error";

import { BoardContextProvider } from "../context/BoardContext";
import { UserContextProvider } from "../context/UserContext";
import { DialogsContextProvider } from "../context/DialogsContext";

const App = () => (
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
);

export default App;
