import React, { useContext } from "react";
import SortIcon from "@material-ui/icons/Sort";
import { MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";

import { BoardContext } from "../../../context/BoardContext";
import { SORT_COLUMN } from "../../../constants/eventNames";
import { SORT_COLUMN_BUTTON } from "../../../constants/testIds";

const SortColumnButton = React.forwardRef((props, ref) => {
  const { columnId, items } = props;
  const { boardId, socket } = useContext(BoardContext);

  function sort() {
    socket.emit(SORT_COLUMN, columnId, items, boardId);
  }

  return (
    <>
      <MenuItem button ref={ref} onClick={sort} data-testid={SORT_COLUMN_BUTTON}>
        <ListItemIcon>
          <SortIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText inset primary="Sort Column" />
      </MenuItem>
    </>
  );
});

export default SortColumnButton;
