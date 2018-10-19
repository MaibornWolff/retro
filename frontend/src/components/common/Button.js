import React from "react";

export const Button = props => {
  const { className, children, ...rest } = props;

  return (
    <button className={`button ${className}`} {...rest}>
      {children}
    </button>
  );
};
