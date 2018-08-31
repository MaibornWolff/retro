import React from "react";
import { Router } from "@reach/router";

import Navbar from "./Navbar";
import Home from "./Home";

const App = () => (
  <div>
    <Navbar />
    <div className="container">
      <Router>
        <Home path="/" />
      </Router>
    </div>
  </div>
);

export default App;
