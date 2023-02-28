import React from "react";
import { Edit } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useDialog } from "../../../hooks/useDialog";
import EditColumnDialog from "../../dialogs/EditColumnDialog";
import { RetroColumn } from "../../../types/retroTypes";

interface EditColumnMenuItemProps {
  column: RetroColumn;
}

const EditColumnMenuItem = React.forwardRef(({ column }: EditColumnMenuItemProps, ref: any) => {
  const { isOpen, closeDialog, openDialog } = useDialog();

  return (
    <>
      <MenuItem ref={ref} onClick={openDialog}>
        <ListItemIcon>
          <Edit fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Edit Name" />
      </MenuItem>
      <EditColumnDialog isOpen={isOpen} close={closeDialog} column={column} />
    </>
  );
});

export default EditColumnMenuItem;
