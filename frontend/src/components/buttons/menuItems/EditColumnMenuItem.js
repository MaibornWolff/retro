import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import { MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";

import { EDIT_COLUMN_NAME_BUTTON } from "../../../constants/testIds";

const EditColumnMenuItem = React.forwardRef((props, ref) => {
  return (
    <MenuItem button ref={ref} onClick={props.openDialog} data-testid={EDIT_COLUMN_NAME_BUTTON}>
      <ListItemIcon>
        <EditIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText inset primary="Edit Name" />
    </MenuItem>
  );
});

export default EditColumnMenuItem;
