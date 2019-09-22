import React, { useContext } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { IconButton } from "@material-ui/core";

import { BoardContext } from "../../../context/BoardContext";
import { UserContext } from "../../../context/UserContext";
import { VOTE_CARD } from "../../../constants/eventNames";
import { UPVOTE_CARD_BUTTON } from "../../../constants/testIds";

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
      <IconButton
        color="primary"
        onClick={upVote}
        data-testid={UPVOTE_CARD_BUTTON}
      >
        <ThumbUpIcon fontSize="small" />
      </IconButton>
    </>
  );
}

export default UpvoteItemButton;
