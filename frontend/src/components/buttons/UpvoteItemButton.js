import React from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { IconButton } from "@material-ui/core";

import { connectSocket } from "../../utils";
import { UPVOTE_CARD } from "../../utils/eventNames";
import { setUser, getVotesLeft } from "../../utils/roleHandlers";

class UpvoteItemButton extends React.Component {
  state = {
    isDisabled: false
  };

  enableButton = () => this.setState({ isDisabled: false });

  disableButton = () => this.setState({ isDisabled: true });

  handleSnackbar = () => {
    this.props.openSnackbar();
  };

  handleUpvote = (id, boardId) => {
    const socket = connectSocket(boardId);
    const votesLeft = getVotesLeft(boardId);

    if (votesLeft > 0) {
      if (!this.state.isDisabled) {
        this.enableButton();
      }

      socket.emit(UPVOTE_CARD, id, boardId, 1);
      setUser("votesLeft", votesLeft - 1, boardId);
      this.handleSnackbar();
    } else {
      this.disableButton();
    }
  };

  render() {
    const { isDisabled } = this.state;
    const { id, boardId } = this.props;

    return (
      <>
        <IconButton
          color="primary"
          onClick={() => this.handleUpvote(id, boardId)}
          disabled={isDisabled}
        >
          <ThumbUpIcon fontSize="small" />
        </IconButton>
      </>
    );
  }
}

export default UpvoteItemButton;
