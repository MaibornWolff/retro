import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

import JoinPokerButton from "./JoinPokerButton";
import StoryButton from "./StoryButton";
import PokerResultsButton from "./PokerResultsButton";
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
        <JoinPokerButton />
        <StoryButton />
        <PokerResetButton />
        <PokerResultsButton />
      </Grid>
    </Grid>
  );
}
