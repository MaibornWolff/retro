import React from "react";

const Title = ({ className, children }) => (
  <h3 id="column-title" className={`${className} title is-3`}>
    {children}
  </h3>
);

export default Title;
