import React from "react";
import io from "socket.io-client";
import uniqid from "uniqid";
import { navigate } from "@reach/router";

import { Input, Button, Form } from "../common";
import { closeModal, LOCAL_BACKEND_ENDPOINT } from "../../utils";
import { CREATE_BOARD } from "../../events/event-names";
import { emptyBoard } from "../../utils/emptyBoard";

export default class CreateBoardForm extends React.Component {
  state = { title: "" };

  handleChange = event => this.setState({ title: event.target.value });

  handleSubmit = async event => {
    event.preventDefault();

    const socket = io(LOCAL_BACKEND_ENDPOINT);
    const boardId = uniqid("board-");
    const { title } = this.state;
    const newBoard = { ...emptyBoard, boardId, title };

    socket.emit(CREATE_BOARD, newBoard, boardId);

    this.setState({ title: "" });
    closeModal();
    await navigate(`boards/${boardId}`);
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
