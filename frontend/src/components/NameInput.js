import React from "react";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import {
  TextField,
  Paper,
  Divider,
  IconButton,
  Snackbar,
  withStyles,
  Typography,
  SnackbarContent
} from "@material-ui/core";

import { validateInput } from "../utils";
import { setUser, getUser } from "../utils/roleHandlers";
import { CARD_AUTHOR_NAME_TOO_LONG_MSG } from "../utils/errorMessages";

class NameInput extends React.Component {
  state = { openSnackbar: false, name: this.getName() };

  getName() {
    const user = getUser(this.props.boardId);
    const name = user === null ? "" : user["name"];
    return name;
  }

  handleClick = () => {
    this.setState({ openSnackbar: true });
    setUser("name", this.state.name, this.props.boardId);
  };

  handleClose = () => {
    this.setState({ openSnackbar: false });
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = event => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.handleClick();
    }
  };

  renderNameError(isNameLong) {
    if (isNameLong) {
      return (
        <Typography variant="caption" color="error">
          {CARD_AUTHOR_NAME_TOO_LONG_MSG}
        </Typography>
      );
    }

    return null;
  }

  render() {
    const { openSnackbar, name } = this.state;
    const { classes } = this.props;
    const nameInput = validateInput(name.length, 0, 40);

    return (
      <>
        <Paper className={classes.root} elevation={1}>
          <TextField
            className={classes.input}
            placeholder="Your Name"
            value={name}
            error={nameInput.isTooLong}
            helperText={this.renderNameError(nameInput.isTooLong)}
            onChange={this.handleChange}
            onKeyPress={this.handleSubmit}
          />
          <Divider className={classes.divider} />
          <IconButton
            color="primary"
            className={classes.iconButton}
            aria-label="User Name"
            onClick={this.handleClick}
            disabled={nameInput.isEmpty}
          >
            <PersonAddIcon />
          </IconButton>
        </Paper>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={openSnackbar}
          onClose={this.handleClose}
          autoHideDuration={5000}
        >
          <SnackbarContent
            className={classes.successColor}
            aria-describedby="name-snackbar"
            message={
              <span id="name-snackbar" className={classes.message}>
                <CheckCircleIcon className={classes.successIcon} />
                Name: &quot;{name}&quot; saved successfully!
              </span>
            }
          />
        </Snackbar>
      </>
    );
  }
}

const styles = theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center"
  },
  input: {
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  successColor: {
    backgroundColor: "green"
  },
  successIcon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1)
  }
});

export default withStyles(styles)(NameInput);
