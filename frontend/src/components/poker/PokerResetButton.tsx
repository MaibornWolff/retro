import React, { useContext } from "react";
import { Button, makeStyles } from "@material-ui/core";

import { PokerContext } from "../../context/PokerContext";
import { POKER_ROLE_MODERATOR } from "../../utils/poker.utils";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}));

export default function PokerResetButton() {
  const classes = useStyles();
  const { pokerState } = useContext(PokerContext);

  function handleClick() {
    console.log("clicked");
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
        Reset Votes
      </Button>
    </>
  );
}
