import React, { useState } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Menu, Typography } from "@material-ui/core";

import PokerPointsSetupButton from "./PokerPointsSetupButton";

const useStyles = makeStyles(() => ({
  settingsButton: {
    textTransform: "none",
    color: "white",
  },
}));

export default function PokerSettingsButton() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleSettings = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="text"
        className={classes.settingsButton}
        aria-label="poker-settings"
        aria-controls="poker-settings-appbar"
        aria-haspopup="true"
        onClick={handleSettings}
        startIcon={<SettingsIcon />}
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
