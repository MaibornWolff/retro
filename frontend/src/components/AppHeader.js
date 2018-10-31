import React from "react";

import SettingsButton from "./SettingsButton";
import CreateBoardButton from "./CreateBoardButton";
import { Navbar, NavbarBrand } from "./styled";

const AppHeader = () => (
  <Navbar className="navbar is-primary" aria-label="main navigation">
    <div className="navbar-brand">
      <div className="navbar-item">
        <NavbarBrand>Retro</NavbarBrand>
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
  </Navbar>
);

export default AppHeader;
