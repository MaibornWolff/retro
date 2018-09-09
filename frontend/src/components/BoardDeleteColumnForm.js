import React from "react";

import Button from "./common/Button";

export default class BoardDeleteColumnForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  closeModal = () => document.querySelector(".custom-modal > button").click();

  handleClick(event) {
    event.preventDefault();
    this.closeModal();
  }

  render() {
    return (
      <div>
        <h5 className="title is-5">
          Are you sure you want to delete this column?
        </h5>
        <Button className="is-danger is-rounded" onClick={this.handleClick}>
          Delete
        </Button>
      </div>
    );
  }
}
