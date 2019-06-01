import React, { useContext } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { IconButton } from "@material-ui/core";

import { connectSocket } from "../../utils";
import { VOTE_CARD } from "../../utils/eventNames";
import { setUser, getVotesLeft, setVotedItem } from "../../utils/roleHandlers";
import { BoardContext } from "../context/BoardContext";

function UpvoteItemButton(props) {
  const { id, openSnackbar } = props;
  const boardId = useContext(BoardContext);

  function updateLocalStorage(votesLeft) {
    setVotedItem(id, boardId, true);
    setUser("votesLeft", votesLeft - 1, boardId);
  }

  function upVote() {
    const votesLeft = getVotesLeft(boardId);

    if (votesLeft > 0) {
      const socket = connectSocket(boardId);
      socket.emit(VOTE_CARD, id, boardId, true);
      updateLocalStorage(votesLeft);
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
