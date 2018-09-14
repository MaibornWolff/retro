import React from "react";

export const Form = props => (
  <form onSubmit={props.onSubmit}>{props.children}</form>
);
