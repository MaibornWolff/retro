import React, { useState, useContext } from "react";
import ExportIcon from "@material-ui/icons/PictureAsPdf";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  withMobileDialog,
} from "@material-ui/core";

import { exportBoard } from "../../../utils";
import { ROLE_MODERATOR } from "../../../utils/userUtils";
import { BoardContext } from "../../../context/BoardContext";
import { UserContext } from "../../../context/UserContext";
import { EXPORT_BOARD_BUTTON } from "../../../constants/testIds";

function ExportBoardButton(props) {
  const { fullScreen } = props;
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { boardId } = useContext(BoardContext);
  const { userState } = useContext(UserContext);

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
    const response = await exportBoard(boardId);
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
        size="small"
        variant="outlined"
        aria-label="Export Board"
        color="primary"
        onClick={openDialog}
        data-testid={EXPORT_BOARD_BUTTON}
        disabled={userState.role !== ROLE_MODERATOR}
        fullWidth
      >
        <ExportIcon style={{ marginRight: 5 }} />
        Export
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

export default withMobileDialog()(ExportBoardButton);
