import React from "react";

export const Input = props => (
  <div className="field">
    <label className="label">{props.label}</label>
    <div className="control">
      <input
        className="input"
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </div>
  </div>
);
