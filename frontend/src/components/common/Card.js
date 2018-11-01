import React from "react";
import io from "socket.io-client";
import Modal from "react-responsive-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";

import DeleteItemButton from "../DeleteItemButton";
import { Button } from "../common";
import EditItemForm from "../forms/EditItemForm";
import { LOCAL_BACKEND_ENDPOINT } from "../../utils";
import { UPVOTE_CARD, UNBLUR_CARD } from "../../events/event-names";
import {
  CardFooter,
  CardPoints,
  CardWrapper,
  CardContainer,
  Unblur
} from "../styled";

export class Card extends React.Component {
  state = { isEdit: false };

  socket = io(LOCAL_BACKEND_ENDPOINT);

  onOpenEdit = () => this.setState({ isEdit: true });

  onCloseEdit = () => this.setState({ isEdit: false });

  handleUpvote = id => {
    const { boardId } = this.props;
    this.socket.emit(UPVOTE_CARD, id, boardId);
  };

  unblur = isBlurred => {
    const { boardId, id } = this.props;
    this.socket.emit(UNBLUR_CARD, isBlurred, id, boardId);
  };

  render() {
    const { isEdit } = this.state;
    const { id, title, content, points, boardId } = this.props;

    // TODO: remove later
    const isBlurred = false;

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

            <DeleteItemButton id={id} boardId={boardId} />

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
