import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";

import { DELETE_COLUMN_BUTTON } from "../../../constants/testIds";

const DeleteColumnMenuItem = React.forwardRef((props, ref) => {
  return (
    <MenuItem
      button
      ref={ref}
      onClick={props.openDialog}
      data-testid={DELETE_COLUMN_BUTTON}
    >
      <ListItemIcon>
        <DeleteIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText inset primary="Delete Column" />
    </MenuItem>
  );
});

export default DeleteColumnMenuItem;
