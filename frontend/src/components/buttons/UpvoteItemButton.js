import React from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { IconButton } from "@material-ui/core";

import { connectSocket } from "../../utils";
import { UPVOTE_CARD } from "../../utils/eventNames";

const handleUpvote = (id, boardId, points) => {
  if (points >= 30) {
    alert("You reached the maximum vote count!");
  }

  const socket = connectSocket(boardId);
  socket.emit(UPVOTE_CARD, id, boardId, 1);
};

const UpvoteItemButton = props => (
  <>
    <IconButton
      color="primary"
      onClick={() => handleUpvote(props.id, props.boardId, props.points)}
    >
      <ThumbUpIcon fontSize="small" />
    </IconButton>
  </>
);

export default UpvoteItemButton;
