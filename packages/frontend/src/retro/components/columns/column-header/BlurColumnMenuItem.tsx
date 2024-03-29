import React, { Ref } from "react";
import { BlurOff, BlurOn } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { RetroColumn } from "../../../types/retroTypes";
import { useRetroContext } from "../../../context/RetroContext";
import { useUserContext } from "../../../../common/context/UserContext";
import { isModerator } from "../../../../common/utils/participantsUtils";

interface BlurColumnMenuItemProperties {
  column: RetroColumn;
}

export const BlurColumnMenuItem = React.forwardRef(
  ({ column }: BlurColumnMenuItemProperties, ref: Ref<HTMLLIElement>) => {
    const { handleToggleColumnBlur } = useRetroContext();
    const { user } = useUserContext();

    const menuItemText = column.isBlurred ? "Unblur Column" : "Blur Column";
    const menuItemIcon = column.isBlurred ? <BlurOff /> : <BlurOn />;

    function toggleBlur() {
      handleToggleColumnBlur(column.index);
    }

    return (
      <MenuItem ref={ref} onClick={toggleBlur} disabled={!isModerator(user)}>
        <ListItemIcon>{menuItemIcon}</ListItemIcon>
        <ListItemText primary={menuItemText} />
      </MenuItem>
    );
  },
);
