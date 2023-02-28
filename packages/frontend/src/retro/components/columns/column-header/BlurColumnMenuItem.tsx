import React from "react";
import { BlurOff } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { RetroColumn } from "../../../types/retroTypes";
import { useRetroContext } from "../../../context/RetroContext";
import { useUserContext } from "../../../../common/context/UserContext";

interface BlurColumnMenuItemProperties {
  column: RetroColumn;
}

const BlurColumnMenuItem = React.forwardRef(
  ({ column }: BlurColumnMenuItemProperties, ref: any) => {
    const { handleToggleColumnBlur } = useRetroContext();
    const { user } = useUserContext();

    function toggleBlur() {
      handleToggleColumnBlur(column.index);
    }

    return (
      <MenuItem ref={ref} onClick={toggleBlur} disabled={user.role !== "moderator"}>
        <ListItemIcon>
          <BlurOff fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Toggle Blur" />
      </MenuItem>
    );
  }
);

export default BlurColumnMenuItem;
