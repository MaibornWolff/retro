import React from "react";
import socketIO from "socket.io-client";

import { Form, Input, Textarea, Button } from "../common";
import { closeModal } from "../../utils/helpers";
import { LOCAL_BACKEND_ENDPOINT, EDIT_CARD } from "../../utils/constants";

export default class EditItemForm extends React.Component {
  state = { ...this.props };

  handleTitleChange = event => this.setState({ cardTitle: event.target.value });

  handleContentChange = event =>
    this.setState({ cardContent: event.target.value });

  handleSubmit = event => {
    event.preventDefault();

    const socket = socketIO(LOCAL_BACKEND_ENDPOINT);
    const { cardTitle, cardContent, cardId } = this.state;

    socket.emit(EDIT_CARD, cardTitle, cardContent, cardId);
    this.setState({ cardTitle: "", cardContent: "" });
    closeModal();
  };

  render() {
    const { cardTitle, cardContent } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
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
