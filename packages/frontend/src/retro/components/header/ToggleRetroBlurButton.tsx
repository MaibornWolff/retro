import React from "react";
import { BlurOff } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";

import { useRetroContext } from "../../context/RetroContext";
import { useUserContext } from "../../../common/context/UserContext";

const ToggleRetroBlurButton = React.forwardRef((props: unknown, ref: any) => {
  const { handleToggleRetroBlur } = useRetroContext();
  const { user } = useUserContext();

  function toggleRetroBlur() {
    handleToggleRetroBlur();
  }

  return (
    <MenuItem
      ref={ref}
      aria-label="Unblur Cards"
      color="primary"
      onClick={toggleRetroBlur}
      disabled={user.role !== "moderator"}
    >
      <ListItemIcon>
        <BlurOff fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="Toggle Blur" />
    </MenuItem>
  );
});

export default ToggleRetroBlurButton;
