import React from "react";
import { Grid, Link, makeStyles, Typography } from "@material-ui/core";

interface PokerTitleProps {
  storyUrl: string | undefined;
  storyTitle: string;
}

const useStyles = makeStyles((theme) => ({
  storyTitle: {
    padding: theme.spacing(2),
  },
}));

export default function PokerTitle(props: PokerTitleProps) {
  const classes = useStyles();

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography variant="h4" className={classes.storyTitle}>
        <Link href={props.storyUrl} target="_blank" rel="nofollow noreferrer">
          {props.storyTitle}
        </Link>
      </Typography>
    </Grid>
  );
}
