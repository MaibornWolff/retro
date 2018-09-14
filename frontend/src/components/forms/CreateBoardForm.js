import React from "react";

import { Input, Button, Form } from "../common";
import { closeModal } from "../../utils/helpers";

export default class CreateBoardForm extends React.Component {
  state = { title: "" };

  handleChange = event => this.setState({ title: event.target.value });

  handleSubmit = event => {
    event.preventDefault();
    closeModal();
  };

  render() {
    const { title } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          label="Board Title"
          value={title}
          onChange={this.handleChange}
          placeholder="New Board Title"
        />
        <Button type="submit" className="is-info is-rounded">
          Create New Board
        </Button>
      </Form>
    );
  }
}
