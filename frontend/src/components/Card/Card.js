import React from "react";

const Card = (props) => (
  <div className="card text-center">
    <div className="card-header">
      {props.cardHeader}
    </div>
    <div className="card-body">
      <h5 className="card-title">{props.cardTitle}</h5>
    </div>
    <div className="card-footer text-muted">
      Votes: {props.cardPoints}
    </div>
  </div>
);

export {Card};
