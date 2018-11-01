import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";

import CreateBoardButton from "./CreateBoardButton";

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
          <Typography variant="h6" className={classes.grow}>
            Welcome to Retro!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" className={classes.grow}>
            Start your retrospective by creating a new board
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CreateBoardButton />
        </Grid>
      </Grid>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    padding: theme.spacing.unit
  }
});

export default withStyles(styles)(Home);
