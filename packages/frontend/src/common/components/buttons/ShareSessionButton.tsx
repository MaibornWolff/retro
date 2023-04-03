import React, { useState } from "react";
import { Box, Button, Snackbar, Typography } from "@mui/material";
import { Share } from "@mui/icons-material";
import { Alert } from "../Alert";

interface ShareSessionButtonProps {
  isDisabled?: boolean;
}

export function ShareSessionButton({ isDisabled = false }: ShareSessionButtonProps) {
  const [open, setOpen] = useState(false);

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
        sx={{ mr: 1, textTransform: "none" }}
        startIcon={<Share />}
        disabled={isDisabled}
      >
        <Typography>Share Session</Typography>
      </Button>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Box>
          <Alert onClose={handleClose} severity="success">
            Successfully copied session URL to clipboard!
          </Alert>
        </Box>
      </Snackbar>
    </>
  );
}
