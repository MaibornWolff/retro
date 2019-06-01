import React, { useState } from "react";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import {
  Button,
  Fab,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
  withStyles,
  Typography
} from "@material-ui/core";

import { isBoardIdValid } from "../../utils";
import { LOAD_BOARD_ID_INVALID_MSG } from "../../utils/errorMessages";

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  icon: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
});

function LoadBoardDialog(props) {
  const { classes, fullScreen, history } = props;
  const [open, setOpen] = useState(false);
  const [boardId, setBoardId] = useState("");
  const [error, setError] = useState(false);

  // all nanoid() calls generate an ID with the default size of 21 chars
  const isValidId = boardId.length === 21;

  function resetState() {
    setOpen(false);
    setBoardId("");
    setError(false);
  }

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    resetState();
  }

  function handleChange(event) {
    setBoardId(event.target.value);
  }

  async function handleSubmit() {
    const isValid = await isBoardIdValid(boardId);

    if (isValid) {
      history.push(`/boards/${boardId}`);
      resetState();
    } else {
      setError(true);
    }
  }

  function renderError() {
    if (error || !isValidId) {
      return (
        <Typography color="error" variant="caption">
          {LOAD_BOARD_ID_INVALID_MSG}
        </Typography>
      );
    }

    return null;
  }

  return (
    <>
      <Fab
        size="medium"
        variant="extended"
        color="primary"
        onClick={openDialog}
        className={classes.button}
      >
        <ArrowUpwardIcon className={classes.icon} />
        Load Board
      </Fab>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={closeDialog}
        aria-labelledby="load-board-dialog-title"
      >
        <DialogTitle id="load-board-dialog-title">Load Board</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide the Board-ID of your board.
          </DialogContentText>
          <TextField
            autoFocus
            required
            error={!isValidId}
            margin="dense"
            label="Board-ID"
            type="text"
            value={boardId}
            onChange={handleChange}
            helperText={renderError()}
            fullWidth
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={!isValidId}>
            Load
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default compose(
  withRouter,
  withMobileDialog(),
  withStyles(styles)
)(LoadBoardDialog);
