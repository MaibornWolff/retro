import React from "react";
import { Link } from "@reach/router";

import SettingsButton from "./SettingsButton";
import CreateBoardButton from "./CreateBoardButton";

import "../styles/Navbar.css";

const App = props => (
  <div className="container-fluid">
    <nav
      id="app-header"
      className="navbar is-info"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <div className="navbar-item">
          <Link id="navbrand" to="/">
            Retro
          </Link>
        </div>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="field is-grouped">
            <CreateBoardButton />
            <SettingsButton />
          </div>
        </div>
      </div>
    </nav>
    {props.children}
  </div>
);

export default App;
