import React from "react";
import SortIcon from "@material-ui/icons/Sort";
import { MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";

import { connectSocket } from "../../utils";
import { SORT_COLUMN } from "../../utils/eventNames";

const onSort = (columnId, items, boardId) => {
  const socket = connectSocket(boardId);
  socket.emit(SORT_COLUMN, columnId, items, boardId);
};

const SortColumnButton = props => (
  <>
    <MenuItem
      button
      onClick={() => onSort(props.columnId, props.items, props.boardId)}
    >
      <ListItemIcon>
        <SortIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText inset primary="Sort Column" />
    </MenuItem>
  </>
);

export default SortColumnButton;
