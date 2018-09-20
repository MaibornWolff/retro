import React from "react";
import { Router } from "@reach/router";

import App from "./App";
import Home from "./Home";
import Board from "./Board";

const Retro = () => (
  <Router>
    <App path="/">
      <Home path="/" />
      <Board path="/boards/:boardId" />
    </App>
  </Router>
);

export default Retro;
