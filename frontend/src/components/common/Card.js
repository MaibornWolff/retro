import React from "react";
import Modal from "react-responsive-modal";
import socketIO from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faEdit,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";

import { Button } from "./Button";
import EditItemForm from "../forms/EditItemForm";
import DeleteItemForm from "../forms/DeleteItemForm";
import { CardFooter, CardPoints } from "../../styles/styledComponents";
import { LOCAL_BACKEND_ENDPOINT } from "../../utils";
import { UPVOTE_CARD } from "../../events/event-names";

import "../../styles/Modal.css";

export class Card extends React.Component {
  state = { isEdit: false, isDelete: false };

  onOpenEdit = () => this.setState({ isEdit: true });

  onOpenDelete = () => this.setState({ isDelete: true });

  onCloseEdit = () => this.setState({ isEdit: false });

  onCloseDelete = () => this.setState({ isDelete: false });

  handleUpvote = cardId => {
    const socket = socketIO(LOCAL_BACKEND_ENDPOINT);
    socket.emit(UPVOTE_CARD, cardId);
  };

  render() {
    const { isEdit, isDelete } = this.state;
    const { cardId, cardTitle, cardContent, cardPoints } = this.props;

    return (
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
            />
          </Modal>

          <Button
            className="is-info is-rounded is-inverted"
            onClick={this.onOpenDelete}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
          <Modal
            open={isDelete}
            onClose={this.onCloseDelete}
            center
            classNames={{ modal: "custom-modal" }}
          >
            <DeleteItemForm cardId={cardId} />
          </Modal>

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
