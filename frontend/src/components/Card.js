import React from "react";

export const Card = props => (
  <div className="card text-center">
    <div className="card-header">{props.cardHeader}</div>
    <div className="card-body">
      <p className="card-title">{props.cardTitle}</p>
    </div>
    <div className="card-footer text-muted">Votes: {props.cardPoints}</div>
  </div>
);
