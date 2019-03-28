import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";

import CreateBoardDialog from "./dialogs/CreateBoardDialog";

class Home extends React.Component {
  render() {
    const { classes } = this.props;

    return (
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
          <Typography variant="subtitle1" className={classes.greetingText}>
            Start your retrospective by creating a new board{" "}
            <span role="img" aria-label="party">
              🎉
            </span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CreateBoardDialog />
        </Grid>
      </Grid>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  greetingText: {
    margin: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(Home);
