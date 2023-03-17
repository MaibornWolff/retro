import React, { useState } from "react";
import { Button, Snackbar, Typography, useTheme } from "@mui/material";
import { Share } from "@mui/icons-material";
import { Alert } from "../Alert";

interface ShareSessionButtonProps {
  isDisabled?: boolean;
}

export function ShareSessionButton({ isDisabled = false }: ShareSessionButtonProps) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  // in an unsecure environment (e.g. HTTP) navigator.clipboard will be 'undefined'
  async function handleClick() {
    try {
      await navigator.clipboard.writeText(location.href);
      setOpen(true);
    } catch (error) {
      const dummy = document.createElement("input");
      document.body.appendChild(dummy);
      dummy.value = location.href;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
      setOpen(true);
    }
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;

    setOpen(false);
  };

  return (
    <>
      <Button
        variant="text"
        aria-label="Share this session"
        onClick={handleClick}
        sx={{ marginRight: theme.spacing(1), textTransform: "none", color: "white" }}
        startIcon={<Share />}
        disabled={isDisabled}
      >
        <Typography color="inherit">Share Session</Typography>
      </Button>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <div>
          <Alert onClose={handleClose} severity="success">
            Successfully copied session URL to clipboard!
          </Alert>
        </div>
      </Snackbar>
    </>
  );
}
