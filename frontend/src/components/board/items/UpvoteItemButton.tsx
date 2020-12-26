import React, { useContext } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { IconButton } from "@material-ui/core";

import { BoardContext } from "../../../context/BoardContext";
import { UserContext } from "../../../context/UserContext";
import { VOTE_CARD } from "../../../constants/event.constants";

type UpvoteItemButtonProps = {
  id: string;
};

export default function UpvoteItemButton(props: UpvoteItemButtonProps) {
  const { id } = props;
  const { boardId, socket } = useContext(BoardContext);
  const { userState, upvoteCard } = useContext(UserContext);

  function upVote() {
    const votesLeft = userState.votesLeft;

    if (votesLeft > 0) {
      socket.emit(VOTE_CARD, id, boardId, true);
      upvoteCard(boardId, id, votesLeft);
    }
  }

  return (
    <IconButton color="inherit" size="small" onClick={upVote}>
      <ThumbUpIcon fontSize="small" />
    </IconButton>
  );
}
