import React from "react";
import io from "socket.io-client";
import Modal from "react-responsive-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faEdit,
  faTrashAlt,
  faEye
} from "@fortawesome/free-solid-svg-icons";

import EditItemForm from "../forms/EditItemForm";
import DeleteItemForm from "../forms/DeleteItemForm";
import { Button } from "./Button";
import { LOCAL_BACKEND_ENDPOINT } from "../../utils";
import { UPVOTE_CARD, UNBLUR_CARD } from "../../events/event-names";
import {
  CardFooter,
  CardPoints,
  CardContainer,
  CardWrapper,
  Unblur
} from "../styled";

import "../../styles/Modal.css";

export class Card extends React.Component {
  state = { isEdit: false, isDelete: false };

  socket = io(LOCAL_BACKEND_ENDPOINT);

  onOpenEdit = () => this.setState({ isEdit: true });

  onOpenDelete = () => this.setState({ isDelete: true });

  onCloseEdit = () => this.setState({ isEdit: false });

  onCloseDelete = () => this.setState({ isDelete: false });

  handleUpvote = id => {
    const { boardId } = this.props;
    this.socket.emit(UPVOTE_CARD, id, boardId);
  };

  unblur = isBlurred => {
    const { boardId, id } = this.props;
    this.socket.emit(UNBLUR_CARD, isBlurred, id, boardId);
  };

  render() {
    const { isEdit, isDelete } = this.state;
    const { id, title, content, points, isBlurred, boardId } = this.props;

    return (
      <CardWrapper isBlurred={isBlurred}>
        <CardContainer className="card">
          <header className="card-header">
            <p className="card-header-title">{title}</p>
            <CardPoints className="has-background-light">{points}</CardPoints>
          </header>
          <div className="card-content">
            <div className="content">{content}</div>
          </div>
          <CardFooter className="card-footer">
            <Button
              className="is-primary is-rounded is-inverted"
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
                id={id}
                title={title}
                content={content}
                boardId={boardId}
              />
            </Modal>

            <Button
              className="is-primary is-rounded is-inverted"
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
              <DeleteItemForm id={id} boardId={boardId} />
            </Modal>

            <Button
              className="is-primary is-rounded is-inverted"
              onClick={() => this.handleUpvote(id)}
              disabled={isBlurred}
            >
              <FontAwesomeIcon icon={faThumbsUp} />
            </Button>
          </CardFooter>
        </CardContainer>
        {isBlurred ? (
          <Unblur onClick={() => this.unblur(!isBlurred)}>
            <FontAwesomeIcon icon={faEye} />
          </Unblur>
        ) : null}
      </CardWrapper>
    );
  }
}
