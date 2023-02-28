import React from "react";
import { Delete } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import DeleteColumnDialog from "../../dialogs/DeleteColumnDialog";
import { useDialog } from "../../../hooks/useDialog";

interface DeleteColumnMenuItemProps {
  columnIndex: number;
}

const DeleteColumnMenuItem = React.forwardRef(
  ({ columnIndex }: DeleteColumnMenuItemProps, ref: any) => {
    const { isOpen, closeDialog, openDialog } = useDialog();

    return (
      <>
        <MenuItem ref={ref} onClick={openDialog}>
          <ListItemIcon>
            <Delete color="error" fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete Column" />
        </MenuItem>
        <DeleteColumnDialog isOpen={isOpen} close={closeDialog} columnIndex={columnIndex} />
      </>
    );
  }
);

export default DeleteColumnMenuItem;
