import React from "react";
import socketIO from "socket.io-client";

import { Input, Button, Form } from "../common";
import { closeModal } from "../../utils/utils";
import { LOCAL_BACKEND_ENDPOINT, CREATE_BOARD } from "../../utils/constants";

export default class CreateBoardForm extends React.Component {
  state = { title: "" };

  handleChange = event => this.setState({ title: event.target.value });

  handleSubmit = event => {
    event.preventDefault();

    const socket = socketIO(LOCAL_BACKEND_ENDPOINT);
    socket.emit(CREATE_BOARD, this.state);

    this.setState({ title: "" });
    closeModal();
  };

  render() {
    const { title } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          label="Board Title"
          value={title}
          onChange={this.handleChange}
          placeholder="New Board Title"
        />
        <Button type="submit" className="is-info is-rounded">
          Create New Board
        </Button>
      </Form>
    );
  }
}
