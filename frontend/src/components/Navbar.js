import React from "react";
import Modal from "react-responsive-modal";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

import Button from "./common/Button";

import "../styles/Navbar.css";
import "../styles/Modal.css";

export default class Navbar extends React.Component {
  state = { open: false };

  onOpenModal = () => this.setState({ open: true });

  onCloseModal = () => this.setState({ open: false });

  render() {
    const { open } = this.state;

    return (
      <header id="app-header">
        <nav className="navbar is-info" aria-label="main navigation">
          <div className="navbar-brand">
            <div className="navbar-item">
              <Link id="navbrand" to="/">
                Retro
              </Link>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field is-grouped">
                <p className="control">
                  <Button
                    className="is-info is-rounded is-inverted is-outlined"
                    onClick={this.onOpenModal}
                  >
                    <FontAwesomeIcon icon={faCog} />
                    &nbsp;Settings
                  </Button>
                </p>

                <Modal
                  open={open}
                  onClose={this.onCloseModal}
                  center
                  classNames={{ modal: "custom-modal" }}
                >
                  <p>Settings Here</p>
                </Modal>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
