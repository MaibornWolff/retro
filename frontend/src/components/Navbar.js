import React from "react";
import { Link } from "@reach/router";

import "../styles/Navbar.css";
import {Button} from "./Button";

export const Navbar = () => (
  <header id="app-header">
    <nav className="navbar is-primary" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-item">
          <Link id="navbrand" to="/">Retro</Link>
        </div>
      </div>

      <div className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-item">
            <Link id="navitem" to="retroformats">Formats</Link>
          </div>
        </div>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="field is-grouped">
            <div className="control">
              <Button
                className="button is-primary is-inverted"
                text="Add List"
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      </div>

    </nav>
  </header>
);
