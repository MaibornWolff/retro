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
import { LOAD_BOARD_ID_INVALID_MSG } from "../../constants/errorMessages";

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
  const hasValidLength = boardId.length === 21;

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function handleChange(event) {
    setBoardId(event.target.value);
  }

  async function handleSubmit() {
    const isValid = await isBoardIdValid(boardId);

    if (isValid) {
      history.push(`/boards/${boardId}`);
    } else {
      setError(true);
    }
  }

  function renderError() {
    if (error) {
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
        fullWidth
        maxWidth="xs"
        fullScreen={fullScreen}
        open={open}
        onClose={closeDialog}
        aria-labelledby="load-board-dialog-title"
      >
        <DialogTitle id="load-board-dialog-title">Load Board</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide the ID of your board.
          </DialogContentText>
          <TextField
            autoFocus
            required
            fullWidth
            inputProps={{
              maxLength: 21
            }}
            value={boardId}
            onChange={handleChange}
            error={error}
            helperText={renderError()}
            label="Board-ID"
            type="text"
            margin="dense"
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={!hasValidLength}
          >
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
