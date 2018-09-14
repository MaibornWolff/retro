import React from "react";
import socketIO from "socket.io-client";

import Button from "../common/Button";
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
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Author</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={cardTitle}
              onChange={this.handleTitleChange}
              placeholder="Your Name"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Content</label>
          <div className="control">
            <textarea
              className="textarea"
              value={cardContent}
              onChange={this.handleContentChange}
              placeholder="Your Feedback"
            />
          </div>
        </div>
        <Button type="submit" className="is-info is-rounded">
          Edit
        </Button>
      </form>
    );
  }
}
