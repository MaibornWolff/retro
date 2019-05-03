import React from "react";
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

import { isModerator } from "../../utils";

const endpoint = "/api/boards/export/";
const port = process.env.REACT_APP_PROD_PORT || "8081";
const exportURL = `http://${window.location.hostname}:${port}${endpoint}`;

class ExportBoardDialog extends React.Component {
  state = { open: false };

  openDialog = () => this.setState({ open: true });

  closeDialog = () => this.setState({ open: false });

  render() {
    const { open } = this.state;
    const { boardId, fullScreen } = this.props;

    return (
      <>
        <Button
          size="small"
          variant="outlined"
          aria-label="Export Board"
          color="primary"
          onClick={this.openDialog}
          data-testid="export-board-btn"
          disabled={!isModerator(boardId)}
        >
          <ExportIcon style={{ marginRight: 5 }} />
          Export Board
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={this.closeDialog}
          aria-labelledby="board-export-dialog"
          aria-describedby="board-export-dialog-description"
        >
          <DialogTitle id="board-export-dialog">Export Board</DialogTitle>
          <DialogContent>
            <DialogContentText id="board-export-dialog-description">
              Hope you had a great retrospective! Do you want to export your
              board now?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.closeDialog}>
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
}

export default withMobileDialog()(ExportBoardDialog);
