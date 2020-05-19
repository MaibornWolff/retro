import React, { useState, useContext } from "react";
import ExportIcon from "@material-ui/icons/GetApp";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  withMobileDialog,
  Typography,
} from "@material-ui/core";

import { exportBoard } from "../../../utils";
import { ROLE_MODERATOR } from "../../../utils/userUtils";
import { BoardContext } from "../../../context/BoardContext";
import { UserContext } from "../../../context/UserContext";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

function ExportTemplateButton(props) {
  const { fullScreen } = props;
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { boardId } = useContext(BoardContext);
  const { userState } = useContext(UserContext);
  const classes = useStyles();

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
    const response = await exportBoard(boardId, "template-export");
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
        disabled={userState.role !== ROLE_MODERATOR}
        className={classes.button}
        startIcon={<ExportIcon />}
      >
        <Typography variant="body1">Export Board Data</Typography>
      </Button>
      <Dialog
        fullWidth
        maxWidth="xs"
        fullScreen={fullScreen}
        open={open}
        onClose={closeDialog}
        aria-labelledby="board-export-template-dialog"
        aria-describedby="board-export-template-dialog-description"
      >
        <DialogTitle id="board-export-template-dialog">Export Template</DialogTitle>
        <DialogContent>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <DialogContentText id="board-export-template-dialog-description">
              Do you want to export a template of your board?
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

export default withMobileDialog()(ExportTemplateButton);
