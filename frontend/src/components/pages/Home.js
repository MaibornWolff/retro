import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";

import CreateBoardDialog from "../board/CreateBoardDialog";
import LoadBoardDialog from "../board/LoadBoardDialog";
import { Hero } from "../styled";
import heroImg from "../../assets/retro-hero.jpg";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    minHeight: "100vh",
  },
  greetingText: {
    margin: theme.spacing(2),
    color: "white",
  },
  subtitleText: {
    marginBottom: theme.spacing(2),
    color: "white",
  },
  button: {
    marginButton: theme.spacing(2),
  },
});

function Home(props) {
  const { classes } = props;

  return (
    <Hero img={heroImg}>
      <Grid
        className={classes.root}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography variant="h1" className={classes.greetingText}>
            Welcome to Retro.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" justify="space-around" alignItems="center">
            <Grid item>
              <CreateBoardDialog />
            </Grid>
            <Grid item>
              <LoadBoardDialog />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Hero>
  );
}

export default withStyles(styles)(Home);
