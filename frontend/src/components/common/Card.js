import React from "react";
import styled from "styled-components";
import Modal from "react-responsive-modal";
import socketIO from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faEdit } from "@fortawesome/free-solid-svg-icons";

import Button from "./Button";
import EditItemForm from "../EditItemForm";
import { LOCAL_BACKEND_ENDPOINT, UPVOTE_CARD } from "../../utils/constants";

import "../../styles/Modal.css";

const CardFooter = styled.div`
  padding: 0.8em;
  display: flex;
  justify-content: space-between;
`;

const CardPoints = styled.p`
  font-weight: bold;
`;

export default class Card extends React.Component {
  state = { open: false };

  onOpenModal = () => this.setState({ open: true });

  onCloseModal = () => this.setState({ open: false });

  handleUpvote = cardId => {
    const socket = socketIO(LOCAL_BACKEND_ENDPOINT);
    socket.emit(UPVOTE_CARD, cardId);
  };

  render() {
    const { open } = this.state;
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
          <Button
            className="is-info is-rounded is-inverted"
            onClick={this.onOpenModal}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Modal
            open={open}
            onClose={this.onCloseModal}
            center
            classNames={{ modal: "custom-modal" }}
          >
            <EditItemForm
              cardId={cardId}
              cardTitle={cardTitle}
              cardContent={cardContent}
            />
          </Modal>
          <CardPoints>
            {cardPoints}
            {" Points"}
          </CardPoints>
          <Button
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
