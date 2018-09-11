import React from "react";
import socketIO from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

import Button from "./common/Button";
import { closeModal } from "../utils/helpers";
import { LOCAL_BACKEND_ENDPOINT, DELETE_COLUMN } from "../utils/constants";

export default class DeleteColumnForm extends React.Component {
  handleClick = event => {
    event.preventDefault();
    const socket = socketIO(LOCAL_BACKEND_ENDPOINT);
    const { columnId } = this.props;

    socket.emit(DELETE_COLUMN, columnId);
    closeModal();
  };

  render() {
    return (
      <div>
        <h3 className="title is-3">
          {"Warning "}
          <FontAwesomeIcon icon={faExclamationCircle} />
        </h3>
        <h5 className="subtitle is-5">
          Do you really want to delete this column?
        </h5>
        <Button className="is-danger is-rounded" onClick={this.handleClick}>
          Delete
        </Button>
      </div>
    );
  }
}
