import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";

import { socket_connect } from "../../utils";
import { SORT_COLUMN } from "../../events/event-names";

const onSort = (columnId, items, boardId) => {
  const socket = socket_connect(boardId);
  socket.emit(SORT_COLUMN, columnId, items, boardId);
};

const SortColumnButton = props => (
  <>
    <Tooltip title="Sort Descending" aria-label="Sort Descending">
      <IconButton
        color="inherit"
        onClick={() => onSort(props.columnId, props.items, props.boardId)}
      >
        <SortIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  </>
);

export default SortColumnButton;
