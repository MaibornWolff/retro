import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Snackbar from "@material-ui/core/Snackbar";

import { setName } from "../utils";

class NameInput extends React.Component {
  state = { openSnackbar: false, name: "" };

  handleSnackbarOpen = () => {
    this.setState({ openSnackbar: true });
  };

  handleSnackbarClose = () => {
    this.setState({ openSnackbar: false });
  };

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    const { openSnackbar, name } = this.state;
    const { classes } = this.props;

    return (
      <>
        <Paper className={classes.root} elevation={1}>
          <InputBase
            className={classes.input}
            placeholder="Your Name"
            value={name}
            onChange={this.handleNameChange}
          />
          <Divider className={classes.divider} />
          <IconButton
            color="primary"
            className={classes.iconButton}
            aria-label="User Name"
            onClick={this.handleSnackbarOpen}
          >
            <PersonAddIcon />
          </IconButton>
        </Paper>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={openSnackbar}
          onClose={this.handleSnackbarClose}
          autoHideDuration={3000}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Name saved!</span>}
        />
      </>
    );
  }
}

const styles = {
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
};

export default withStyles(styles)(NameInput);
