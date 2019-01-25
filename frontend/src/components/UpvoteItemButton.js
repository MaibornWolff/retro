import React from "react";
import io from "socket.io-client";
import cookie from "react-cookies";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { IconButton } from "@material-ui/core";

import { LOCAL_BACKEND_ENDPOINT } from "../utils";
import { UPVOTE_CARD } from "../events/event-names";

const upvoteCookiePrefix = "upvote";

const addToCookie = (id, boardId) => {
  cookie.save(boardId + upvoteCookiePrefix + id, true);
};

const handleUpvote = (id, boardId) => {
  addToCookie(id, boardId);
  const socket = io(LOCAL_BACKEND_ENDPOINT);
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
