import React from "react";

import AppHeader from "./AppHeader";

const Retro = props => (
  <div className="container-fluid">
    <AppHeader />
    {props.children}
  </div>
);

export default Retro;
