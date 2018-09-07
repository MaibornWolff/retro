import React from "react";
import Modal from "react-responsive-modal";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Title from "./common/Title";
import Button from "./common/Button";
import BoardColumnForm from "./BoardColumnForm";

import "../styles/Modal.css";

const Container = styled.div`
  margin: 1.5em 1.5em 0em 1.5em;
  display: flex;
  justify-content: space-between;
`;

const StyledTitle = styled(Title)`
  margin: 0 !important;
`;

export default class BoardHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };

    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  onOpenModal() {
    this.setState({ open: true });
  }

  onCloseModal() {
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state;
    const { title } = this.props;

    return (
      <Container>
        <StyledTitle className="is-4">{title}</StyledTitle>
        <Button className="is-info is-rounded" onClick={this.onOpenModal}>
          <FontAwesomeIcon icon={faPlus} />
          &nbsp; Column
        </Button>
        <Modal
          open={open}
          onClose={this.onCloseModal}
          center
          classNames={{ modal: "custom-modal" }}
        >
          <BoardColumnForm />
        </Modal>
      </Container>
    );
  }
}
