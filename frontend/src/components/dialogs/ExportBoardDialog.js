import React, { useState, useContext } from "react";
import ExportIcon from "@material-ui/icons/PictureAsPdf";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  withMobileDialog
} from "@material-ui/core";

import { isModerator } from "../../utils/roleHandlers";
import { BoardContext } from "../context/BoardContext";

const endpoint = "/api/boards/export/";
const port = process.env.REACT_APP_PROD_PORT || "8081";
const exportURL = `http://${window.location.hostname}:${port}${endpoint}`;

function ExportBoardDialog(props) {
  const { fullScreen } = props;
  const [open, setOpen] = useState(false);
  const boardId = useContext(BoardContext);

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        aria-label="Export Board"
        color="primary"
        onClick={openDialog}
        data-testid="export-board-btn"
        disabled={!isModerator(boardId)}
      >
        <ExportIcon style={{ marginRight: 5 }} />
        Export Board
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={closeDialog}
        aria-labelledby="board-export-dialog"
        aria-describedby="board-export-dialog-description"
      >
        <DialogTitle id="board-export-dialog">Export Your Board</DialogTitle>
        <DialogContent>
          <DialogContentText id="board-export-dialog-description">
            Hope you had a great retrospective! Do you want to export your board
            now?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button color="primary" href={exportURL + boardId}>
            Export
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withMobileDialog()(ExportBoardDialog);
