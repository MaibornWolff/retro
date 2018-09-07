import React from "react";

import Button from "./common/Button";

export default class BoardItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      content: ""
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
    alert(
      `author: ${this.state.author}
      conent: ${this.state.content}`
    );
    this.setState({ author: "", content: "" });
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
