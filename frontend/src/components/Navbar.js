import React from "react";
import { Link } from "@reach/router";

import "../styles/Navbar.css";

const Navbar = () => (
  <header id="app-header">
    <nav className="navbar is-primary" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-item">
          <Link id="navbrand" to="/">
            Retro
          </Link>
        </div>
      </div>
    </nav>
  </header>
);

export default Navbar;
