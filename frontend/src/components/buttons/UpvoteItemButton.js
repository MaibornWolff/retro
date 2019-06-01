import React, { useContext } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { IconButton } from "@material-ui/core";

import { connectSocket } from "../../utils";
import { VOTE_CARD } from "../../utils/eventNames";
import { BoardContext } from "../context/BoardContext";
import { VoteContext } from "../context/VoteContext";
import { upvoteCard } from "../../actions";

function UpvoteItemButton(props) {
  const { id, openSnackbar } = props;
  const boardId = useContext(BoardContext);
  const { userState, dispatch } = useContext(VoteContext);

  function upVote() {
    const votesLeft = userState.votesLeft;

    if (votesLeft > 0) {
      const socket = connectSocket(boardId);
      socket.emit(VOTE_CARD, id, boardId, true);
      upvoteCard(boardId, id, votesLeft, dispatch);
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
