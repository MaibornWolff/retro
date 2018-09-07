import React from "react";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

import Button from "./common/Button";

import "../styles/Navbar.css";

const handleClick = () => {
  alert("you clicked the settings button!");
};

const Navbar = () => (
  <header id="app-header">
    <nav className="navbar is-dark" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-item">
          <Link id="navbrand" to="/">
            Retro
          </Link>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              <Button className="is-info" onClick={handleClick}>
                <FontAwesomeIcon icon={faCog} />
                &nbsp;Settings
              </Button>
            </p>
          </div>
        </div>
      </div>
    </nav>
  </header>
);

export default Navbar;
