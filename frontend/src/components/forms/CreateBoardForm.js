import React from "react";
import io from "socket.io-client";
import styled from "styled-components";
import uniqid from "uniqid";
import { navigate } from "@reach/router";

import { Input, Button, Form } from "../common";
import { closeModal, LOCAL_BACKEND_ENDPOINT } from "../../utils";
import { CREATE_BOARD } from "../../events/event-names";
import { emptyBoard } from "../../utils/emptyBoard";
import { ButtonStyles } from "../styled";

const CreateButton = styled(Button)`
  ${ButtonStyles};
`;

export default class CreateBoardForm extends React.Component {
  state = { title: "" };

  handleChange = event => this.setState({ title: event.target.value });

  handleSubmit = async event => {
    event.preventDefault();

    const socket = io(LOCAL_BACKEND_ENDPOINT);
    const { title } = this.state;
    const boardId = uniqid("board-");
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
          className="input"
          type="text"
          label="Board Title"
          value={title}
          onChange={this.handleChange}
          placeholder="New Board Title"
        />
        <CreateButton type="submit" className="is-primary is-rounded">
          Create New Board
        </CreateButton>
      </Form>
    );
  }
}
