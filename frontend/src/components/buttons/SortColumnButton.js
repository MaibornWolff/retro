import React, { useContext } from "react";
import SortIcon from "@material-ui/icons/Sort";
import { MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";

import { connectSocket } from "../../utils";
import { SORT_COLUMN } from "../../utils/eventNames";
import { BoardContext } from "../context/BoardContext";

function SortColumnButton(props) {
  const { columnId, items } = props;
  const boardId = useContext(BoardContext);

  function sort() {
    const socket = connectSocket(boardId);
    socket.emit(SORT_COLUMN, columnId, items, boardId);
  }

  return (
    <>
      <MenuItem button onClick={sort}>
        <ListItemIcon>
          <SortIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText inset primary="Sort Column" />
      </MenuItem>
    </>
  );
}

export default SortColumnButton;
