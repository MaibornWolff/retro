import React from "react";
import io from "socket.io-client";
import uniqid from "uniqid";
import styled from "styled-components";

import { Form, Input, Button } from "../common";
import { closeModal, LOCAL_BACKEND_ENDPOINT } from "../../utils";
import { CREATE_COLUMN } from "../../events/event-names";
import { ButtonStyles } from "../styled";

const SubmitButton = styled(Button)`
  ${ButtonStyles};
`;

export default class CreateColumnForm extends React.Component {
  state = { title: "" };

  handleTitleChange = event => this.setState({ title: event.target.value });

  handleSubmit = event => {
    event.preventDefault();
    const socket = io(LOCAL_BACKEND_ENDPOINT);

    const id = uniqid("column-");
    const { title } = this.state;
    const { boardId } = this.props;

    const column = { id, title, itemIds: [] };
    socket.emit(CREATE_COLUMN, column, boardId);

    this.setState({ title: "" });
    closeModal();
  };

  render() {
    const { title } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          className="input"
          type="text"
          label="Column Title"
          value={title}
          onChange={this.handleTitleChange}
          placeholder="New Column Title"
        />
        <SubmitButton type="submit" className="is-primary is-rounded">
          Submit
        </SubmitButton>
      </Form>
    );
  }
}
