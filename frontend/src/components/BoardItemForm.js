import React from "react";
import socketIO from "socket.io-client";

import Button from "./common/Button";
import { LOCAL_BACKEND_ENDPOINT, CREATE_CARD } from "../utils/constants";

export default class BoardItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      content: "",
    };

    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  closeModal = () => document.querySelector(".custom-modal > button").click();

  handleAuthorChange(event) {
    this.setState({ author: event.target.value });
  }

  handleContentChange(event) {
    this.setState({ content: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const socket = socketIO(LOCAL_BACKEND_ENDPOINT);
    const { author, content } = this.state;
    const { boardItemsCount, columnId } = this.props;
    const id = boardItemsCount + 1;

    const newCard = {
      id: `item-${id}`,
      author,
      content,
      points: 0
    };

    socket.emit(CREATE_CARD, newCard, columnId);
    this.setState({ author: "", content: "" });
    this.closeModal();
  }

  render() {
    const { author, content } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Author</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={author}
              onChange={this.handleAuthorChange}
              placeholder="Your Name"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Content</label>
          <div className="control">
            <textarea
              className="textarea"
              value={content}
              onChange={this.handleContentChange}
              placeholder="Your Feedback"
            />
          </div>
        </div>
        <Button type="submit" className="is-info is-rounded">
          Submit
        </Button>
      </form>
    );
  }
}
