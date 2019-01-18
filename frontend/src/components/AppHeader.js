import React from "react";
import { AppBar, Toolbar, Typography, withStyles } from "@material-ui/core";

const AppHeader = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="h4" color="inherit" className={classes.brand}>
            Retro
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const styles = () => ({
  root: {
    flexGrow: 1
  },
  brand: {
    flexGrow: 1,
    fontFamily: "Permanent Marker, cursive"
  }
});

export default withStyles(styles)(AppHeader);
