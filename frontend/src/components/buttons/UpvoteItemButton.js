import React, { useContext } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { IconButton } from "@material-ui/core";

import { VOTE_CARD } from "../../utils/eventNames";
import { BoardContext } from "../../context/BoardContext";
import { UserContext } from "../../context/UserContext";

function UpvoteItemButton(props) {
  const { id, openSnackbar } = props;
  const { boardId, socket } = useContext(BoardContext);
  const { userState, upvoteCard } = useContext(UserContext);

  function upVote() {
    const votesLeft = userState.votesLeft;

    if (votesLeft > 0) {
      socket.emit(VOTE_CARD, id, boardId, true);
      upvoteCard(boardId, id, votesLeft);
      openSnackbar();
    }
  }

  return (
    <>
      <IconButton color="primary" onClick={upVote}>
        <ThumbUpIcon fontSize="small" />
      </IconButton>
    </>
  );
}

export default UpvoteItemButton;
