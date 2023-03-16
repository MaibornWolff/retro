import React, { useState } from "react";
import { Settings } from "@mui/icons-material";
import { Button, Menu, Typography } from "@mui/material";

import { PokerPointsSetupButton } from "./PokerPointsSetupButton";
import { useUserContext } from "../../../common/context/UserContext";
import { isModerator } from "../../../common/utils/participantsUtils";

export function PokerSettingsButton() {
  const { user } = useUserContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleSettings = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!isModerator(user)) return null;

  return (
    <>
      <Button
        variant="text"
        sx={{ textTransform: "none", color: "white" }}
        aria-label="poker-settings"
        aria-controls="poker-settings-appbar"
        aria-haspopup="true"
        onClick={handleSettings}
        startIcon={<Settings />}
      >
        <Typography>Settings</Typography>
      </Button>
      <Menu
        keepMounted
        id="poker-settings-appbar"
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <PokerPointsSetupButton />
      </Menu>
    </>
  );
}
