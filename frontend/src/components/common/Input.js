import React from "react";

export const Input = props => {
  const { className, label, ...rest } = props;

  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input className={`input ${className}`} {...rest} />
      </div>
    </div>
  );
};
