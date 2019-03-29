import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";

import CreateBoardDialog from "./dialogs/CreateBoardDialog";
import LoadBoardDialog from "./dialogs/LoadBoardDialog";
import { Hero } from "./styled";
import heroImg from "../assets/retro-hero.jpg";

class Home extends React.Component {
  render() {
    const { classes } = this.props;

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
            <Typography variant="h4" className={classes.greetingText}>
              Welcome to Retro!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" className={classes.subtitleText}>
              Start your retrospective by creating a new board{" "}
              <span role="img" aria-label="party">
                🎉
              </span>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
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
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: "100vh"
  },
  greetingText: {
    margin: theme.spacing.unit * 2,
    color: "white"
  },
  subtitleText: {
    marginBottom: theme.spacing.unit * 2,
    color: "white"
  },
  button: {
    marginButton: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(Home);
