import React from "react";

const Button = ({ className, onClick, children, type }) => (
  <button className={`button ${className}`} onClick={onClick} type={type}>
    {children}
  </button>
);

export default Button;
