import React, { useState, useContext } from "react";
import ExportIcon from "@material-ui/icons/PhotoCamera";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

import { BoardContext } from "../context/BoardContext";
import { UserContext } from "../context/UserContext";
import { exportBoard } from "../utils";
import { ROLE_MODERATOR } from "../utils/user.utils";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

export default function ExportBoardButton() {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { boardId } = useContext(BoardContext);
  const { userState } = useContext(UserContext);
  const classes = useStyles();
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("sm"));

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function startLoading() {
    setLoading(true);
  }

  function stopLoading() {
    setLoading(false);
  }

  async function handleExport() {
    startLoading();
    const response = await exportBoard(boardId, "board-export");
    stopLoading();

    if (response.ok) {
      window.open(response.url);
      closeDialog();
    } else {
      console.log(response);
      alert(
        "Whoops... Seems like the export failed :(\nContact your admin and provide the console log by opening the developer tools of your browser."
      );
    }
  }

  return (
    <div>
      <Button
        fullWidth
        variant="text"
        aria-label="Export Board"
        color="primary"
        onClick={openDialog}
        className={classes.button}
        disabled={userState.role !== ROLE_MODERATOR}
        startIcon={<ExportIcon />}
      >
        <Typography variant="body1">Export Board Image</Typography>
      </Button>
      <Dialog
        fullWidth
        maxWidth="xs"
        fullScreen={fullScreen}
        open={open}
        onClose={closeDialog}
        aria-labelledby="board-export-dialog"
        aria-describedby="board-export-dialog-description"
      >
        <DialogTitle id="board-export-dialog">Export Your Board</DialogTitle>
        <DialogContent>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <DialogContentText id="board-export-dialog-description">
              Hope you had a great retrospective!
              <br />
              Do you want to export your board now?
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={closeDialog} disabled={isLoading}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleExport} disabled={isLoading}>
            Export
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
