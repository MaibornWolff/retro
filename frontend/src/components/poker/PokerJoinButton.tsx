import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  TextField,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { PokerContext } from "../../context/PokerContext";
import { JOIN_POKER_SESSION } from "../../constants/event.constants";
import { getPokerUser } from "../../utils/poker.utils";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}));

export default function PokerJoinButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { pokerId, pokerState, socket, setPokerName } = useContext(
    PokerContext
  );
  const classes = useStyles();
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("sm"));
  const isError = name.length > 40;

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleClose() {
    setName("");
    setOpen(false);
  }

  function handleSubmit() {
    const pokerUser = getPokerUser(pokerId);
    pokerUser["name"] = name;
    socket.emit(JOIN_POKER_SESSION, pokerUser, pokerId);
    setPokerName(pokerId, name);
    handleClose();
  }

  return (
    <>
      <Button
        color="primary"
        variant="outlined"
        className={classes.root}
        onClick={openDialog}
        disabled={Boolean(pokerState.name)}
      >
        Join Session
      </Button>
      <Dialog
        fullWidth
        maxWidth="sm"
        fullScreen={fullScreen}
        open={open}
        onClose={closeDialog}
        aria-labelledby="join-poker-dialog-title"
      >
        <DialogTitle id="join-poker-dialog-title">
          Join Poker Session
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide a name, so that your team can recognize your
            estimation.
          </DialogContentText>
          <TextField
            required
            autoFocus
            fullWidth
            value={name}
            onChange={handleNameChange}
            error={isError}
            id="user-name"
            label="Name"
            type="text"
            margin="dense"
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={isError}>
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
