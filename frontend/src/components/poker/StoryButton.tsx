import React from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}));

export default function StoryButton() {
  const classes = useStyles();

  return (
    <>
      <Button variant="outlined" className={classes.root}>
        Set Story
      </Button>
    </>
  );
}
