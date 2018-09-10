import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faEdit } from "@fortawesome/free-solid-svg-icons";

import Button from "./Button";

const CardFooter = styled.div`
  padding: 0.8em;
  display: flex;
  justify-content: space-between;
`;

const Card = ({ cardTitle, cardContent, cardPoints }) => (
  <div className="card">
    <header className="card-header">
      <p className="card-header-title">{cardTitle}</p>
    </header>
    <div className="card-content">
      <div className="content">{cardContent}</div>
    </div>
    <CardFooter>
      <Button type="button" className="is-info is-rounded is-outlined">
        <FontAwesomeIcon icon={faEdit} />
      </Button>
      <p>
        <strong>{cardPoints} Points</strong>
      </p>
      <Button
        type="button"
        className="is-info is-rounded is-outlined"
      >
        <FontAwesomeIcon icon={faThumbsUp} />
      </Button>
    </CardFooter>
  </div>
);

export default Card;
