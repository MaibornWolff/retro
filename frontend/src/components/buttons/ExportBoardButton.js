import React from "react";
import ExportIcon from "@material-ui/icons/PictureAsPdf";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  Button,
  withMobileDialog
} from "@material-ui/core";

const endpoint = "/api/boards/export/";
const port = "8081";
const exportURL = `http://${window.location.hostname}:${port}${endpoint}`;

class ExportBoardButton extends React.Component {
  state = { open: false };

  openDialog = () => this.setState({ open: true });

  closeDialog = () => this.setState({ open: false });

  render() {
    const { open } = this.state;
    const { boardId, fullScreen, className } = this.props;

    return (
      <>
        <Grid item className={className}>
          <Button
            size="small"
            variant="outlined"
            aria-label="Export Board"
            color="primary"
            onClick={this.openDialog}
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
                Do you want to export this board?
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
        </Grid>
      </>
    );
  }
}

export default withMobileDialog()(ExportBoardButton);
