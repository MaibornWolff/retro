import React from "react";

export const Button = ({className, text, onClick}) => (
  <button className={className} onClick={onClick}>
    {text}
  </button>
);
