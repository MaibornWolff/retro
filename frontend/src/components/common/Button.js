import React from "react";

export const Button = ({ className, onClick, children, type }) => (
  <button className={`button ${className}`} onClick={onClick} type={type}>
    {children}
  </button>
);
