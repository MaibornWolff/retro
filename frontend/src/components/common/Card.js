import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

/* eslint-disable jsx-a11y/anchor-is-valid */
const Card = ({ cardTitle, cardContent, cardFooter }) => (
  <div className="card">
    <header className="card-header">
      <p className="card-header-title">{cardTitle}</p>
    </header>
    <div className="card-content">
      <div className="content">{cardContent}</div>
    </div>
    <footer className="card-footer">
      <p className="card-footer-item">
        {cardFooter}
      </p>
      <a href="#" className="card-footer-item">
        <FontAwesomeIcon icon={faThumbsUp} />
      </a>
      <a href="#" className="card-footer-item">
        <FontAwesomeIcon icon={faThumbsDown} />
      </a>
    </footer>
  </div>
);

export default Card;
