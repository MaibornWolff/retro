import React from "react";
import io from "socket.io-client";
import { IconButton } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";

import { LOCAL_BACKEND_ENDPOINT } from "../utils";
import { SORT_COLUMN } from "../events/event-names";

const onSort = (columnId, items, boardId) => {
  const socket = io(LOCAL_BACKEND_ENDPOINT);
  socket.emit(SORT_COLUMN, columnId, items, boardId);
};

const SortColumnButton = props => (
  <>
    <IconButton
      color="secondary"
      onClick={() => onSort(props.columnId, props.items, props.boardId)}
    >
      <SortIcon fontSize="small" />
    </IconButton>
  </>
);

export default SortColumnButton;
