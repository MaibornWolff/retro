import React from "react";

const Title = ({ className, children }) => (
  <h4 className={`${className} title`}>
    {children}
  </h4>
);

export default Title;
