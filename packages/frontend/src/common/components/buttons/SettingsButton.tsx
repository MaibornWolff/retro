import React, { ReactNode, useState } from "react";
import { Button, Menu, Typography } from "@mui/material";
import { Settings } from "@mui/icons-material";

interface SettingsButtonProps {
  children?: ReactNode;
}

export function SettingsButton({ children }: SettingsButtonProps) {
  const [anchorEl, setAnchorEl] = useState<Element>();
  const open = Boolean(anchorEl);

  const handleSettings = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  return (
    <>
      <Button
        variant="text"
        sx={{
          textTransform: "none",
        }}
        aria-label="settings button"
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
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        {children}
      </Menu>
    </>
  );
}
