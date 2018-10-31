import React from "react";
import { Router } from "@reach/router";

import Retro from "./Retro";
import Home from "./Home";
import Board from "./Board";
import { AppProvider } from "./App.context";

const App = () => (
  <AppProvider>
    <Router>
      <Retro path="/">
        <Home path="/" />
        <Board path="/boards/:boardId" />
      </Retro>
    </Router>
  </AppProvider>
);

export default App;
