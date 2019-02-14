import React from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import { Fab, Drawer, withStyles, List } from "@material-ui/core";

import ExportBoard from "../settings/ExportBoard";
import UnblurCards from "../settings/UnblurCards";
import VoteCount from "../settings/VoteCount";

class SettingsButton extends React.Component {
  state = { open: false };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  render() {
    const { open } = this.state;
    const { classes, boardId } = this.props;

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
            <List>
              <UnblurCards boardId={boardId} />
              <ExportBoard boardId={boardId} />
              <VoteCount boardId={boardId} />
            </List>
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
