import React from "react";

export const Input = props => {
  const { label, ...rest } = props;

  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input {...rest} />
      </div>
    </div>
  );
};
