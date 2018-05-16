import React from "react";

const Header = () => (
  <header className="shadow">
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand">Retro</a>
      <form class="form-inline">
        <button class="btn btn-outline-success" type="button">Main button</button>
        <button class="btn btn-sm align-middle btn-outline-secondary" type="button">Smaller button</button>
      </form>
    </nav>
  </header>
);

export default Header;
