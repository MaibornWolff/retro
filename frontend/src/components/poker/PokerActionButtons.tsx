import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

import PokerJoinButton from "./PokerJoinButton";
import PokerStoryButton from "./PokerStoryButton";
import PokerResultButton from "./PokerResultButton";
import PokerResetButton from "./PokerResetButton";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}));

export default function PokerActionButtons() {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.root}>
      <Grid container direction="row">
        <PokerJoinButton />
        <PokerStoryButton />
        <PokerResetButton />
        <PokerResultButton />
      </Grid>
    </Grid>
  );
}
