import React from "react";
import Modal from "react-responsive-modal";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Title from "./common/Title";
import Button from "./common/Button";
import CreateColumnForm from "./CreateColumnForm";

import "../styles/Modal.css";

const Container = styled.div`
  margin: 1.5em 1em 0em 1em;
  display: flex;
  justify-content: space-between;
`;

const StyledTitle = styled(Title)`
  margin: 0 !important;
`;

export default class Header extends React.Component {
  state = { open: false };

  onOpenModal = () => this.setState({ open: true });

  onCloseModal = () => this.setState({ open: false });

  render() {
    const { open } = this.state;
    const { title, columnsCount } = this.props;

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
          <CreateColumnForm columnsCount={columnsCount} />
        </Modal>
      </Container>
    );
  }
}
