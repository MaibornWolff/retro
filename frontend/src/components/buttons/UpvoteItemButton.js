import React from "react";
import io from "socket.io-client";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { IconButton } from "@material-ui/core";

import { BACKEND_ENDPOINT } from "../../utils";
import { UPVOTE_CARD } from "../../events/event-names";

const handleUpvote = (id, boardId) => {
  const socket = io(BACKEND_ENDPOINT);
  socket.emit(UPVOTE_CARD, id, boardId, 1);
};

const UpvoteItemButton = props => (
  <>
    <IconButton
      color="primary"
      onClick={() => handleUpvote(props.id, props.boardId)}
    >
      <ThumbUpIcon fontSize="small" />
    </IconButton>
  </>
);

export default UpvoteItemButton;
