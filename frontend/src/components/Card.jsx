import React from "react";

const Card = ({ header, content, points }) => (
  <div className="card has-text-centered">
    <header className="card-header">
      <p className="card-header-title">{header}</p>
    </header>
    <div className="card-content">
      <div className="content">{content}</div>
    </div>
    <footer className="card-footer">
      <p className="card-footer-item">{points} Votes</p>
    </footer>
  </div>
);

export default Card;
