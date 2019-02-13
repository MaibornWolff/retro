import React from "react";
import { Fab, Drawer, withStyles, List } from "@material-ui/core";

import SettingsItem from "./SettingsItem";

const settingNames = ["Export Board", "Unblur Cards"];

class Settings extends React.Component {
  state = { open: false };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  renderSettingItems(settings) {
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
          color="secondary"
          onClick={this.handleOpen}
          className={classes.button}
        >
          Settings
        </Fab>
        <Drawer open={open} onClose={this.handleClose} anchor="right">
          <div className={classes.list}>
            <List>{this.renderSettingItems(settingNames)}</List>
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
  }
});

export default withStyles(styles)(Settings);
