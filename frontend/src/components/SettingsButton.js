import React from "react";
import Modal from "react-responsive-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

import SettingsForm from "./forms/SettingsForm";
import { Button } from "./common";
import { NavbarButton } from "./styled";

export default class SettingsButton extends React.Component {
  state = { open: false };

  onOpenModal = () => this.setState({ open: true });

  onCloseModal = () => this.setState({ open: false });

  render() {
    const { open } = this.state;

    return (
      <NavbarButton>
        <Button
          className="is-primary is-rounded is-inverted is-outlined"
          onClick={this.onOpenModal}
        >
          <FontAwesomeIcon icon={faCog} />
          &nbsp;Settings
        </Button>

        <Modal
          open={open}
          onClose={this.onCloseModal}
          center
          classNames={{ modal: "custom-modal" }}
        >
          <SettingsForm />
        </Modal>
      </NavbarButton>
    );
  }
}
