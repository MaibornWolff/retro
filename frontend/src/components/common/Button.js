import React from "react";

const Button = ({ className, onClick, children }) => (
  <a className={`button ${className}`} onClick={onClick}>
    {children}
  </a>
);

export default Button;
