import React from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { IconButton } from "@material-ui/core";

import { connectSocket } from "../../utils";
import { VOTE_CARD } from "../../utils/eventNames";
import { setUser, getVotesLeft, setVotedItem } from "../../utils/roleHandlers";

class UpvoteItemButton extends React.PureComponent {
  handleSnackbar = () => {
    this.props.openSnackbar();
  };

  handleUpvote = (id, boardId) => {
    const votesLeft = getVotesLeft(boardId);

    if (votesLeft > 0) {
      const socket = connectSocket(boardId);
      socket.emit(VOTE_CARD, id, boardId, true);
      setVotedItem(id, boardId, true);

      setUser("votesLeft", votesLeft - 1, boardId);
      this.handleSnackbar();
    }
  };

  render() {
    const { id, boardId } = this.props;

    return (
      <>
        <IconButton
          color="primary"
          onClick={() => this.handleUpvote(id, boardId)}
        >
          <ThumbUpIcon fontSize="small" />
        </IconButton>
      </>
    );
  }
}

export default UpvoteItemButton;
