import React from "react";

import AppHeader from "./AppHeader";

const Retro = props => (
  <div>
    <AppHeader />
    {props.children}
  </div>
);

export default Retro;
