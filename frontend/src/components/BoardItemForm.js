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
      points: 0
    };

    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAuthorChange(event) {
    this.setState({ author: event.target.value });
  }

  handleContentChange(event) {
    this.setState({ content: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { author, content, points } = this.state;
    const { boardItemsCount, columnId } = this.props;
    const newCardId = boardItemsCount + 1;
    const socket = socketIO(LOCAL_BACKEND_ENDPOINT);

    const newCard = {
      id: `item-${newCardId}`,
      author,
      content,
      points
    };

    socket.emit(CREATE_CARD, newCard, columnId);
    this.setState({ author: "", content: "" });
    document.querySelector(".custom-modal > button").click();
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
