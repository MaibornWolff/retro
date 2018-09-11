import React from "react";
import styled from "styled-components";
import socketIO from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faEdit } from "@fortawesome/free-solid-svg-icons";

import Button from "./Button";
import { LOCAL_BACKEND_ENDPOINT, UPVOTE_CARD } from "../../utils/constants";

const CardFooter = styled.div`
  padding: 0.8em;
  display: flex;
  justify-content: space-between;
`;

const CardPoints = styled.p`
  font-weight: bold;
`;

export default class Card extends React.Component {
  handleUpvote = cardId => {
    const socket = socketIO(LOCAL_BACKEND_ENDPOINT);
    socket.emit(UPVOTE_CARD, cardId);
  };

  render() {
    const { cardId, cardTitle, cardContent, cardPoints } = this.props;

    return (
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">{cardTitle}</p>
        </header>
        <div className="card-content">
          <div className="content">{cardContent}</div>
        </div>
        <CardFooter>
          <Button type="button" className="is-info is-rounded is-inverted">
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <CardPoints>{cardPoints} Points</CardPoints>
          <Button
            type="button"
            className="is-info is-rounded is-inverted"
            onClick={() => this.handleUpvote(cardId)}
          >
            <FontAwesomeIcon icon={faThumbsUp} />
          </Button>
        </CardFooter>
      </div>
    );
  }
}
