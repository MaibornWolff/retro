import React from "react";
import socketIO from "socket.io-client";

import { Input, Button, Form } from "../common";
import { closeModal } from "../../utils/helpers";
import { LOCAL_BACKEND_ENDPOINT, CREATE_BOARD } from "../../utils/constants";

export default class CreateBoardForm extends React.Component {
  state = { title: "" };

  handleChange = event => this.setState({ title: event.target.value });

  handleSubmit = event => {
    event.preventDefault();

    const socket = socketIO(LOCAL_BACKEND_ENDPOINT);
    const { title } = this.state;
    const newBoard = {
      title,
      items: {},
      columns: {},
      columnOrder: []
    };
    socket.emit(CREATE_BOARD, newBoard);

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
