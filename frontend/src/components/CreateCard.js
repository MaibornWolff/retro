import React from "react";

import Button from './common/Button';

export default class CreateCard extends React.Component {
  state = {
    author: "",
    content: ""
  };

  handleAuthorChange(event) {
    this.setState({ author: event.target.value });
  }

  handleContentChange(event) {
    this.setState({ content: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    alert("A name was submitted: " + this.state.author + this.state.content);
  }

  render() {
    const { author, content } = this.state;

    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="field">
          <label className="label">Author</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={author}
              onChange={this.handleAuthorChange.bind(this)}
              placeholder="Text input"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Content</label>
          <div className="control">
            <textarea
              className="textarea"
              value={content}
              onChange={this.handleContentChange.bind(this)}
              placeholder="Text input"
            />
          </div>
        </div>
        <Button type="submit" className="is-primary">
          Submit
        </Button>
      </form>
    );
  }
}
