import React from "react";
import ExportBoardIcon from "@material-ui/icons/PictureAsPdf";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  withMobileDialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";

const endpoint = "/api/boards/export/";
const port = "8081";
const exportURL = `http://${window.location.hostname}:${port}${endpoint}`;

class ExportBoard extends React.Component {
  state = { open: false };

  openExportDialog = () => this.setState({ open: true });

  closeExportDialog = () => this.setState({ open: false });

  render() {
    const { open } = this.state;
    const { boardId, fullScreen } = this.props;

    return (
      <>
        <ListItem button onClick={this.openExportDialog}>
          <ListItemIcon>
            <ExportBoardIcon />
          </ListItemIcon>
          <ListItemText primary={"Export Board"} />
        </ListItem>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={this.closeExportDialog}
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
            <Button color="primary" onClick={this.closeExportDialog}>
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

export default withMobileDialog()(ExportBoard);
