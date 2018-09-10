import React from "react";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

import Button from "./common/Button";

import "../styles/Navbar.css";

const handleClick = () => alert("you clicked the settings button!");

const Navbar = () => (
  <header id="app-header">
    <nav className="navbar is-info" aria-label="main navigation">
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
            <p className="control">
              <Button className="is-info is-rounded is-inverted is-outlined" onClick={handleClick}>
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
