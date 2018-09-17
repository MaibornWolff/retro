import React from "react";
import socketIO from "socket.io-client";

import { Form, Input, Button } from "../common";
import { closeModal } from "../../utils/utils";
import { LOCAL_BACKEND_ENDPOINT, CREATE_COLUMN } from "../../utils/constants";

export default class CreateColumnForm extends React.Component {
  state = { title: "" };

  handleTitleChange = event => this.setState({ title: event.target.value });

  handleSubmit = event => {
    event.preventDefault();

    const socket = socketIO(LOCAL_BACKEND_ENDPOINT);
    const { title } = this.state;
    const { columnsCount } = this.props;
    const id = `column-${columnsCount + 1}`;

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
