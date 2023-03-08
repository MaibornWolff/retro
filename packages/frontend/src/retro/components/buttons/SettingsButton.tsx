import React, { useState } from "react";
import { Button, Menu, Typography } from "@mui/material";
import { Settings } from "@mui/icons-material";
import VoteCountButton from "./VoteCountButton";
import ExportRetroImageButton from "./ExportRetroImageButton";
import ExportRetroButton from "./ExportRetroButton";
import QrCodeButton from "./QrCodeButton";
import ImportRetroButton from "./ImportRetroButton";

export default function SettingsButton() {
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
        <VoteCountButton />
        <ExportRetroImageButton />
        <ExportRetroButton />
        <ImportRetroButton />
        <QrCodeButton />
      </Menu>
    </>
  );
}
