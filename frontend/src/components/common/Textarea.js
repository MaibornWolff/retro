import React from "react";

export const Textarea = props => (
  <div className="field">
    <label className="label">{props.label}</label>
    <div className="control">
      <textarea
        className="textarea"
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </div>
  </div>
);
