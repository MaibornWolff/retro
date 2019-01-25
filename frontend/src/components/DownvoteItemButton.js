import React from "react";
import io from "socket.io-client";
import cookie from 'react-cookies'
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { Fab } from "@material-ui/core";

import { LOCAL_BACKEND_ENDPOINT } from "../utils";
import { UPVOTE_CARD } from "../events/event-names";

const upvoteCookiePrefix = 'upvote';

const removeFromCookie = (id, boardId) => {
    cookie.remove(boardId + upvoteCookiePrefix + id, true);
};

const handleDownvote = (id, boardId) => {
  removeFromCookie(id, boardId);
  const socket = io(LOCAL_BACKEND_ENDPOINT);
  socket.emit(UPVOTE_CARD, id, boardId, -1);
};

const DownvoteItemButton = props => (
    <>
        <Fab
            color="secondary"
            size="small"
            onClick={() => handleDownvote(props.id, props.boardId)}
        >
            <ThumbUpIcon fontSize="small" />
        </Fab>
    </>
);

export default DownvoteItemButton;
