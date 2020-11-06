/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { Button, makeStyles, Typography, Snackbar } from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";

import Alert from "./Alert";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
    textTransform: "none",
    color: "white",
  },
}));

export default function ShareSessionButton() {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

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

  function handleClose(event?: React.SyntheticEvent, reason?: string) {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }

  return (
    <>
      <Button
        variant="text"
        aria-label="Share this session"
        onClick={handleClick}
        className={classes.button}
        startIcon={<ShareIcon />}
      >
        <Typography color="inherit">Share Session</Typography>
      </Button>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Successfully copied session URL to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
}
