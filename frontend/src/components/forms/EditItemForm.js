import React from "react";
import io from "socket.io-client";

import { Form, Input, Textarea, Button } from "../common";
import { closeModal, LOCAL_BACKEND_ENDPOINT } from "../../utils";
import { EDIT_CARD } from "../../events/event-names";

export default class EditItemForm extends React.Component {
  state = { ...this.props };

  handleTitleChange = event => this.setState({ cardTitle: event.target.value });

  handleContentChange = event =>
    this.setState({ cardContent: event.target.value });

  handleSubmit = event => {
    event.preventDefault();
    const socket = io(LOCAL_BACKEND_ENDPOINT);

    const { cardTitle, cardContent, cardId } = this.state;
    const { boardId } = this.props;

    socket.emit(EDIT_CARD, cardTitle, cardContent, cardId, boardId);
    this.setState({ cardTitle: "", cardContent: "" });
    closeModal();
  };

  render() {
    const { cardTitle, cardContent } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          type="text"
          label="Author"
          value={cardTitle}
          onChange={this.handleTitleChange}
          placeholder="Your Name"
        />
        <Textarea
          label="Content"
          value={cardContent}
          onChange={this.handleContentChange}
          placeholder="Your Feedback"
        />
        <Button type="submit" className="is-info is-rounded">
          Edit
        </Button>
      </Form>
    );
  }
}
