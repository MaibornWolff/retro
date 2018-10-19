import React from "react";

export const Switch = props => (
  <div className="field">
    <input
      id={props.id}
      type="checkbox"
      name={props.name}
      className={`switch ${props.className}`}
      checked={props.checked}
      onClick={props.onClick}
    />
    <label htmlFor={props.id}>{props.label}</label>
  </div>
);
