import React from "react";
import io from "socket.io-client";
import styled from "styled-components";

import { Form, Input, Textarea, Button } from "../common";
import { closeModal, LOCAL_BACKEND_ENDPOINT } from "../../utils";
import { EDIT_CARD } from "../../events/event-names";
import { ButtonStyles } from "../styled";

const EditButton = styled(Button)`
  ${ButtonStyles};
`;

export default class EditItemForm extends React.Component {
  state = {
    title: this.props.title,
    content: this.props.content
  };

  handleTitleChange = event => this.setState({ title: event.target.value });

  handleContentChange = event => this.setState({ content: event.target.value });

  handleSubmit = event => {
    event.preventDefault();
    const socket = io(LOCAL_BACKEND_ENDPOINT);

    const { title, content, id, boardId } = this.props;
    socket.emit(EDIT_CARD, title, content, id, boardId);

    this.setState({ title: "", content: "" });
    closeModal();
  };

  render() {
    const { title, content } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          className="input"
          type="text"
          label="Author"
          value={title}
          onChange={this.handleTitleChange}
          placeholder="Your Name"
        />
        <Textarea
          label="Content"
          value={content}
          onChange={this.handleContentChange}
          placeholder="Your Feedback"
        />
        <EditButton type="submit" className="is-primary is-rounded">
          Edit
        </EditButton>
      </Form>
    );
  }
}
