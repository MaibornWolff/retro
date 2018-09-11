import React from "react";
import socketIO from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

import Button from "./common/Button";
import { LOCAL_BACKEND_ENDPOINT, DELETE_CARD } from "../utils/constants";

export default class DeleteItemForm extends React.Component {
  closeModal = () => document.querySelector(".custom-modal > button").click();

  handleClick = event => {
    event.preventDefault();
    const socket = socketIO(LOCAL_BACKEND_ENDPOINT);
    const { cardId } = this.props;

    socket.emit(DELETE_CARD, cardId);
    this.closeModal();
  };

  render() {
    return (
      <div>
        <h3 className="title is-3">
          {"Warning "}
          <FontAwesomeIcon icon={faExclamationCircle} />
        </h3>
        <h5 className="subtitle is-5">
          Do you really want to delete this card?
        </h5>
        <Button className="is-danger is-rounded" onClick={this.handleClick}>
          Delete
        </Button>
      </div>
    );
  }
}
