import React from "react";

export const Input = props => (
  <div className="field">
    <label className="label">{props.label}</label>
    <div className="control">
      <input
        className={`input ${props.className}`}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        onInput={props.onInput}
        placeholder={props.placeholder}
        autoFocus
      />
    </div>
  </div>
);
