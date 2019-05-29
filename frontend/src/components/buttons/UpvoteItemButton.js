import React from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { IconButton } from "@material-ui/core";

import { connectSocket } from "../../utils";
import { VOTE_CARD, SET_MAX_VOTES, RESET_VOTES } from "../../utils/eventNames";
import { setUser, getVotesLeft, setVotedItem } from "../../utils/roleHandlers";

class UpvoteItemButton extends React.Component {
  state = {
    isDisabled: false
  };

  componentDidMount() {
    const socket = connectSocket(this.props.boardId);

    socket.on(SET_MAX_VOTES, () => {
      this.enableButton();
    });

    socket.on(RESET_VOTES, () => {
      this.enableButton();
    });
  }

  enableButton = () => this.setState({ isDisabled: false });

  disableButton = () => this.setState({ isDisabled: true });

  handleSnackbar = () => {
    this.props.openSnackbar();
  };

  handleUpvote = (id, boardId) => {
    const socket = connectSocket(boardId);
    const votesLeft = getVotesLeft(boardId);

    if (votesLeft > 0) {
      socket.emit(VOTE_CARD, id, boardId, true);
      setVotedItem(id, boardId, true);
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
