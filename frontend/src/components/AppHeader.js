import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";

import CreateBoardButton from "./CreateBoardButton";

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

const AppHeader = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Retro
          </Typography>

          <CreateBoardButton />

          <Button color="inherit">
            Settings
            <SettingsIcon className={classes.rightIcon} />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(AppHeader);
