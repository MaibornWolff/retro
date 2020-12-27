import React, { useContext } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { PokerContext } from "../../context/PokerContext";
import { SHOW_POKER_RESULTS } from "../../constants/event.constants";
import { POKER_ROLE_MODERATOR } from "../../utils/poker.utils";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}));

export default function PokerResultButton() {
  const classes = useStyles();
  const { pokerState, socket, pokerId } = useContext(PokerContext);

  function handleClick() {
    socket.emit(SHOW_POKER_RESULTS, pokerId);
  }

  return (
    <>
      <Button
        color="primary"
        variant="outlined"
        className={classes.root}
        onClick={handleClick}
        disabled={pokerState.role !== POKER_ROLE_MODERATOR}
      >
        Show Results
      </Button>
    </>
  );
}
