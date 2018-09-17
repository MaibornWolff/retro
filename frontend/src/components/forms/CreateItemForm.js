import React from "react";
import socketIO from "socket.io-client";

import { Form, Input, Textarea, Button } from "../common";
import { closeModal } from "../../utils/utils";
import { LOCAL_BACKEND_ENDPOINT, CREATE_CARD } from "../../utils/constants";

export default class CreateItemForm extends React.Component {
  state = {
    author: "",
    content: ""
  };

  handleAuthorChange = event => this.setState({ author: event.target.value });

  handleContentChange = event => this.setState({ content: event.target.value });

  handleSubmit = event => {
    event.preventDefault();

    const socket = socketIO(LOCAL_BACKEND_ENDPOINT);
    const { author, content } = this.state;
    const { itemsCount, columnId } = this.props;
    const id = itemsCount + 1;

    const newCard = {
      id: `item-${id}`,
      author,
      content,
      points: 0
    };

    socket.emit(CREATE_CARD, newCard, columnId);
    this.setState({ author: "", content: "" });
    closeModal();
  };

  render() {
    const { author, content } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          label="Author"
          value={author}
          onChange={this.handleAuthorChange}
          placeholder="Your Name"
        />
        <Textarea
          label="Content"
          value={content}
          onChange={this.handleContentChange}
          placeholder="Your Feedback"
        />
        <Button type="submit" className="is-info is-rounded">
          Submit
        </Button>
      </Form>
    );
  }
}
