import React from "react";
import { Router } from "@reach/router";

import App from "./App";
import Home from "./Home";
import Board from "./Board";
import { AppProvider } from "./App.context";

const Retro = () => (
  <AppProvider>
    <Router>
      <App path="/">
        <Home path="/" />
        <Board path="/boards/:boardId" />
      </App>
    </Router>
  </AppProvider>
);

export default Retro;
