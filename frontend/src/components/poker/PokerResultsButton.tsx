import React, { useContext } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { PokerContext } from "../../context/PokerContext";
import { SHOW_POKER_RESULTS } from "../../constants/event.constants";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}));

export default function PokerResultsButton() {
  const classes = useStyles();
  const { socket } = useContext(PokerContext);

  function handleClick() {
    socket.emit(SHOW_POKER_RESULTS);
  }

  return (
    <>
      <Button variant="outlined" className={classes.root} onClick={handleClick}>
        Show Results
      </Button>
    </>
  );
}
