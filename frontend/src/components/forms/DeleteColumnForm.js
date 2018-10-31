import React from "react";
import io from "socket.io-client";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

import { Button } from "../common";
import { closeModal, LOCAL_BACKEND_ENDPOINT } from "../../utils";
import { DELETE_COLUMN } from "../../events/event-names";
import { ButtonStyles } from "../styled";

const DeleteButton = styled(Button)`
  ${ButtonStyles};
`;

export default class DeleteColumnForm extends React.Component {
  handleClick = event => {
    event.preventDefault();

    const socket = io(LOCAL_BACKEND_ENDPOINT);
    const { columnId, boardId } = this.props;

    socket.emit(DELETE_COLUMN, columnId, boardId);
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
        <DeleteButton
          className="is-danger is-rounded"
          onClick={this.handleClick}
        >
          Delete
        </DeleteButton>
      </div>
    );
  }
}
