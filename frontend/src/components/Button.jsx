import React from "react";

const Button = ({ className, text, onClick }) => (
  <button className={className} onClick={onClick}>
    {text}
  </button>
);

export default Button;
