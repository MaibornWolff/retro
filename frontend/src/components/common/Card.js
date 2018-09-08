import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faEdit } from "@fortawesome/free-solid-svg-icons";

import Button from "./Button";

const CardFooter = styled.div`
  padding: .8em;
  display: flex;
  justify-content: space-between;
`;

/* eslint-disable jsx-a11y/anchor-is-valid */
const Card = ({ cardTitle, cardContent, cardPoints }) => (
  <div className="card">
    <header className="card-header">
      <p className="card-header-title">{cardTitle}</p>
    </header>
    <div className="card-content">
      <div className="content">{cardContent}</div>
    </div>
    <CardFooter>
      <Button
        className="is-info is-rounded is-outlined"
        type="button"
      >
        <FontAwesomeIcon icon={faEdit} />
      </Button>
      <p>
        <strong>{cardPoints}</strong>
      </p>
      <Button
        className="is-info is-rounded is-outlined"
        type="button"
      >
        <FontAwesomeIcon icon={faThumbsUp} />
      </Button>
    </CardFooter>
  </div>
);

export default Card;
