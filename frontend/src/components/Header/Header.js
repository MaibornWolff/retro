import React from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";

const Header = () => (
  <header className="shadow">
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="/" exact>Retro</NavLink>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <NavLink id="homeNavButton" className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
          </li>
          <li className="nav-item">
            <NavLink id="formatsNavButton" className="nav-link" to="/retro-formats">Formats</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export {Header};
