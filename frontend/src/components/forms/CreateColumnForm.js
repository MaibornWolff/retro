import React from "react";
import socketIO from "socket.io-client";
import uniqid from "uniqid";

import { Form, Input, Button } from "../common";
import { closeModal, LOCAL_BACKEND_ENDPOINT } from "../../utils";
import { CREATE_COLUMN } from "../../events/event-names";

export default class CreateColumnForm extends React.Component {
  state = { title: "" };

  handleTitleChange = event => this.setState({ title: event.target.value });

  handleSubmit = event => {
    event.preventDefault();

    const socket = socketIO(LOCAL_BACKEND_ENDPOINT);
    const { title } = this.state;
    const id = uniqid("column-");
    const newColumn = { id, title, itemIds: [] };

    socket.emit(CREATE_COLUMN, newColumn);

    this.setState({ title: "" });
    closeModal();
  };

  render() {
    const { title } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          label="Column Title"
          value={title}
          onChange={this.handleTitleChange}
          placeholder="New Column Title"
        />
        <Button type="submit" className="is-info is-rounded">
          Submit
        </Button>
      </Form>
    );
  }
}
