import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faEdit } from "@fortawesome/free-solid-svg-icons";

/* eslint-disable jsx-a11y/anchor-is-valid */
const Card = ({ cardTitle, cardContent, cardFooter }) => (
  <div className="card">
    <header className="card-header">
      <p className="card-header-title">{cardTitle}</p>
      <p className="card-footer-item">
        <strong>{cardFooter}</strong>
      </p>
    </header>
    <div className="card-content">
      <div className="content">{cardContent}</div>
    </div>
    <footer className="card-footer">
      <a href="#" className="card-footer-item">
        <FontAwesomeIcon icon={faEdit} />
      </a>
      <a href="#" className="card-footer-item">
        <FontAwesomeIcon icon={faThumbsUp} />
      </a>
    </footer>
  </div>
);

export default Card;
