import React from "react";
import socketIO from "socket.io-client";

import Button from "./common/Button";
import { LOCAL_BACKEND_ENDPOINT, DELETE_COLUMN } from "../utils/constants";

export default class BoardDeleteColumnForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  closeModal = () => document.querySelector(".custom-modal > button").click();

  handleClick(event) {
    event.preventDefault();

    const socket = socketIO(LOCAL_BACKEND_ENDPOINT);
    const { columnId } = this.props;

    socket.emit(DELETE_COLUMN, columnId);

    this.closeModal();
  }

  render() {
    return (
      <div>
        <h5 className="title is-5">
          Are you sure you want to delete this column?
        </h5>
        <Button className="is-danger is-rounded" onClick={this.handleClick}>
          Delete
        </Button>
      </div>
    );
  }
}
