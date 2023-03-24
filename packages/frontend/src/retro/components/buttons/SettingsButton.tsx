import React, { useState } from "react";
import { Button, Menu, Typography } from "@mui/material";
import { Settings } from "@mui/icons-material";
import { ManageVotesMenuItem } from "./ManageVotesMenuItem";
import { ExportRetroImageMenuItem } from "./ExportRetroImageMenuItem";
import { ExportRetroMenuItem } from "./ExportRetroMenuItem";
import { QrCodeButton } from "./QrCodeButton";
import { ImportRetroMenuItem } from "./ImportRetroMenuItem";

export function SettingsButton() {
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
        sx={{
          textTransform: "none",
          color: "white",
        }}
        aria-label="retro settings"
        aria-controls="settings-appbar"
        aria-haspopup="true"
        onClick={handleSettings}
        startIcon={<Settings />}
      >
        <Typography>Settings</Typography>
      </Button>
      <Menu
        keepMounted
        id="settings-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <ManageVotesMenuItem />
        <ExportRetroImageMenuItem />
        <ExportRetroMenuItem />
        <ImportRetroMenuItem />
        <QrCodeButton />
      </Menu>
    </>
  );
}
