import React from "react";
import { Edit } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { EditColumnDialog } from "../../dialogs/EditColumnDialog";
import { RetroColumn } from "../../../types/retroTypes";
import { useDialog } from "../../../../common/hooks/useDialog";

interface EditColumnMenuItemProps {
  column: RetroColumn;
}

export const EditColumnMenuItem = React.forwardRef(
  ({ column }: EditColumnMenuItemProps, ref: any) => {
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
  },
);
