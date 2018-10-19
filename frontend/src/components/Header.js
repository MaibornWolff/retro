import React from "react";
import Modal from "react-responsive-modal";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { HeaderContainer, BoardTitleStyles } from "./styled";
import { Title, Button } from "./common";
import CreateColumnForm from "./forms/CreateColumnForm";

import "../styles/Modal.css";

const BoardTitle = styled(Title)`
  ${BoardTitleStyles};
`;

const CreateColumnButton = styled(Button)`
  box-shadow: 0 6px 6px -2px lightgrey !important;
`;

export default class Header extends React.Component {
  state = { open: false };

  onOpenModal = () => this.setState({ open: true });

  onCloseModal = () => this.setState({ open: false });

  render() {
    const { open } = this.state;
    const { title, boardId } = this.props;

    return (
      <HeaderContainer>
        <BoardTitle className="is-4">{title}</BoardTitle>
        <CreateColumnButton
          className="is-info is-rounded"
          onClick={this.onOpenModal}
        >
          <FontAwesomeIcon icon={faPlus} />
          &nbsp; Column
        </CreateColumnButton>
        <Modal
          open={open}
          onClose={this.onCloseModal}
          center
          classNames={{ modal: "custom-modal" }}
        >
          <CreateColumnForm boardId={boardId} />
        </Modal>
      </HeaderContainer>
    );
  }
}
