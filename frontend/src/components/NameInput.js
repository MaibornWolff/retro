import React, { useState, useContext } from "react";
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
import { CARD_AUTHOR_NAME_TOO_LONG_MSG } from "../utils/errorMessages";
import { BoardContext } from "../context/BoardContext";
import { UserContext } from "../context/UserContext";
import { setUsername } from "../actions";

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

function NameInput(props) {
  const { classes } = props;
  const { boardId } = useContext(BoardContext);
  const { userState, dispatch } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(getName());
  const nameInput = validateInput(name.length, 0, 40);

  function getName() {
    if (userState.name) return userState.name;
    return "";
  }

  function handleClick() {
    setUsername(boardId, name, dispatch);
    setOpen(true);
  }

  function closeSnackbar() {
    setOpen(false);
  }

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleSubmit(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleClick();
    }
  }

  function renderNameError(isNameLong) {
    if (isNameLong) {
      return (
        <Typography variant="caption" color="error">
          {CARD_AUTHOR_NAME_TOO_LONG_MSG}
        </Typography>
      );
    }

    return null;
  }

  return (
    <>
      <Paper className={classes.root} elevation={1}>
        <TextField
          className={classes.input}
          placeholder="Your Name"
          value={name}
          error={nameInput.isTooLong}
          helperText={renderNameError(nameInput.isTooLong)}
          onChange={handleChange}
          onKeyPress={handleSubmit}
        />
        <Divider className={classes.divider} />
        <IconButton
          color="primary"
          className={classes.iconButton}
          aria-label="User Name"
          onClick={handleClick}
          disabled={nameInput.isEmpty}
        >
          <PersonAddIcon />
        </IconButton>
      </Paper>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        onClose={closeSnackbar}
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

export default withStyles(styles)(NameInput);
