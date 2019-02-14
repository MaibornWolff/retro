import React from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import { Fab, Drawer, withStyles, List } from "@material-ui/core";

import SettingsItem from "../SettingsItem";

const allSettings = ["Export Board", "Unblur Cards"];

class SettingsButton extends React.Component {
  state = { open: false };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  renderSettingsItem(settings) {
    return settings.map(name => {
      return (
        <SettingsItem name={name} key={name} boardId={this.props.boardId} />
      );
    });
  }

  render() {
    const { open } = this.state;
    const { classes } = this.props;

    return (
      <>
        <Fab
          variant="extended"
          color="primary"
          size="medium"
          onClick={this.handleOpen}
          className={classes.button}
        >
          <SettingsIcon className={classes.icon} />
          Settings
        </Fab>
        <Drawer open={open} onClose={this.handleClose} anchor="right">
          <div className={classes.list}>
            <List>{this.renderSettingsItem(allSettings)}</List>
          </div>
        </Drawer>
      </>
    );
  }
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  list: {
    width: 250
  },
  icon: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

export default withStyles(styles)(SettingsButton);
