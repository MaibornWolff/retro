import React, { useState, useContext } from "react";
import ExportIcon from "@material-ui/icons/PictureAsPdf";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  withMobileDialog,
} from "@material-ui/core";

import { BACKEND_DEV_PORT } from "../../../utils";
import { ROLE_MODERATOR } from "../../../utils/userUtils";
import { BoardContext } from "../../../context/BoardContext";
import { UserContext } from "../../../context/UserContext";
import { EXPORT_BOARD_BUTTON } from "../../../constants/testIds";

const endpoint = "/api/boards/export/";
const port = process.env.REACT_APP_PROD_PORT || BACKEND_DEV_PORT;
const exportURL = `http://${window.location.hostname}:${port}${endpoint}`;

function ExportBoardButton(props) {
  const { fullScreen } = props;
  const [open, setOpen] = useState(false);
  const { boardId } = useContext(BoardContext);
  const { userState } = useContext(UserContext);

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
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
          <DialogContentText id="board-export-dialog-description">
            Hope you had a great retrospective!
            <br />
            Do you want to export your board now?
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
    </div>
  );
}

export default withMobileDialog()(ExportBoardButton);
