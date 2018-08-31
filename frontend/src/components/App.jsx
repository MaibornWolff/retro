import React from "react";
import { Router } from "@reach/router";

import { Navbar } from "./Navbar";
import { Home } from "./Home";
import { RetroFormats } from "./RetroFormats";

const App = () => (
  <div>
    <Navbar />
    <div className="container">
      <Router>
        <Home path="/" />
        <RetroFormats path="/retroformats" />
      </Router>
    </div>
  </div>
);

export default App;
