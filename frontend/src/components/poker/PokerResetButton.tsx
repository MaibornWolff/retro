import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

import { PokerContext } from "../../context/PokerContext";
import { POKER_ROLE_MODERATOR } from "../../utils/poker.utils";
import { POKER_RESET } from "../../constants/event.constants";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  yes: {
    color: theme.palette.error.main,
  },
}));

export default function PokerResetButton() {
  const [open, setOpen] = useState(false);
  const { pokerId, pokerState, socket } = useContext(PokerContext);
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("sm"));
  const classes = useStyles();

  function handleClick() {
    socket.emit(POKER_RESET, pokerId);
    setOpen(false);
  }

  return (
    <>
      <Button
        color="primary"
        variant="outlined"
        className={classes.root}
        onClick={() => setOpen(true)}
        disabled={pokerState.role !== POKER_ROLE_MODERATOR}
      >
        Reset Votes
      </Button>
      <Dialog
        fullWidth
        maxWidth="sm"
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="poker-reset-dialog-title"
      >
        <DialogTitle id="poker-reset-dialog-title">Reset Votes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to reset all votes! Do you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            No
          </Button>
          <Button onClick={handleClick} className={classes.yes}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
