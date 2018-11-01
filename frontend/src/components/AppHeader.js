import React from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  withStyles
} from "@material-ui/core";

const AppHeader = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="h5" color="inherit" className={classes.grow}>
            Retro
          </Typography>

          <Button color="inherit">
            Settings
            <SettingsIcon className={classes.rightIcon} />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

export default withStyles(styles)(AppHeader);
