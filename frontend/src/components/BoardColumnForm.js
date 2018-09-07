import React from "react";

import Button from "./common/Button";

export default class BoardColumnForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "" };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    alert(`title: ${this.state.title}`);
    this.setState({ title: "" });
  }

  render() {
    const { title } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Column Title</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={title}
              onChange={this.handleTitleChange}
              placeholder="New Column Title"
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
