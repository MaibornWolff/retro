import React from "react";

import AppHeader from "./AppHeader";

const Retro = props => (
  <>
    <AppHeader />
    {props.children}
  </>
);

export default Retro;
