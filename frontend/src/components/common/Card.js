import React from "react";
import Modal from "react-responsive-modal";
import Blur from "react-css-blur";
import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faEdit,
  faTrashAlt,
  faEye
} from "@fortawesome/free-solid-svg-icons";

import { Button } from "./Button";
import EditItemForm from "../forms/EditItemForm";
import DeleteItemForm from "../forms/DeleteItemForm";
import { CardFooter, CardPoints } from "../styled";
import { LOCAL_BACKEND_ENDPOINT } from "../../utils";
import { UPVOTE_CARD } from "../../events/event-names";

import "../../styles/Modal.css";

import styled from "styled-components";

const CardWrapper = styled.div`
  position: relative;
  border: 1px solid lightgrey;
`;

const BlurToggle = styled.a`
  position: absolute;
  top: 5.5%;
  right: 4%;
  color: black;

  &:hover {
    color: #37474f;
  }
`;

export class Card extends React.Component {
  state = { isEdit: false, isDelete: false, isBlurred: true };

  onOpenEdit = () => this.setState({ isEdit: true });

  onOpenDelete = () => this.setState({ isDelete: true });

  onCloseEdit = () => this.setState({ isEdit: false });

  onCloseDelete = () => this.setState({ isDelete: false });

  setBlur = isBlurred => this.setState({ isBlurred });

  handleUpvote = cardId => {
    const socket = io(LOCAL_BACKEND_ENDPOINT);
    const { boardId } = this.props;

    socket.emit(UPVOTE_CARD, cardId, boardId);
  };

  renderBlurToggle() {
    const { isBlurred } = this.state;

    if (isBlurred)
      return (
        <BlurToggle onClick={() => this.setBlur(!isBlurred)}>
          <FontAwesomeIcon icon={faEye} />
        </BlurToggle>
      );

    return null;
  }

  render() {
    const { isEdit, isDelete, isBlurred } = this.state;
    const { cardId, cardTitle, cardContent, cardPoints, boardId } = this.props;

    return (
      <CardWrapper>
        <Blur radius={isBlurred ? "5px" : "0"}>
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">{cardTitle}</p>
              <CardPoints className="has-background-grey-lighter">
                {cardPoints}
              </CardPoints>
            </header>
            <div className="card-content">
              <div className="content">{cardContent}</div>
            </div>
            <CardFooter className="card-footer">
              <Button
                className="is-info is-rounded is-inverted"
                onClick={this.onOpenEdit}
                disabled={isBlurred}
              >
                <FontAwesomeIcon icon={faEdit} />
              </Button>
              <Modal
                open={isEdit}
                onClose={this.onCloseEdit}
                center
                classNames={{ modal: "custom-modal" }}
              >
                <EditItemForm
                  cardId={cardId}
                  cardTitle={cardTitle}
                  cardContent={cardContent}
                  boardId={boardId}
                />
              </Modal>

              <Button
                className="is-info is-rounded is-inverted"
                onClick={this.onOpenDelete}
                disabled={isBlurred}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
              <Modal
                open={isDelete}
                onClose={this.onCloseDelete}
                center
                classNames={{ modal: "custom-modal" }}
              >
                <DeleteItemForm cardId={cardId} boardId={boardId} />
              </Modal>

              <Button
                className="is-info is-rounded is-inverted"
                onClick={() => this.handleUpvote(cardId)}
                disabled={isBlurred}
              >
                <FontAwesomeIcon icon={faThumbsUp} />
              </Button>
            </CardFooter>
          </div>
        </Blur>
        {this.renderBlurToggle()}
      </CardWrapper>
    );
  }
}
