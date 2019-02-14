import React from "react";
import io from "socket.io-client";
import ExportBoardIcon from "@material-ui/icons/PictureAsPdf";
import UnblurCardsIcon from "@material-ui/icons/BlurOff";
import {
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  withMobileDialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import { LOCAL_BACKEND_ENDPOINT } from "../utils";
import { UNBLUR_CARDS } from "../events/event-names";

const EXPORT_BOARD_SETTING = "Export Board";
const UNBLUR_CARDS_SETTING = "Unblur Cards";

const endpoint = "/api/boards/export/";
const port = "8081";
const exportURL = `http://${window.location.hostname}:${port}${endpoint}`;

class SettingsItem extends React.Component {
  state = { open: false };

  openExportDialog = () => this.setState({ open: true });

  closeExportDialog = () => this.setState({ open: false });

  handleUnblur(boardId) {
    const socket = io(LOCAL_BACKEND_ENDPOINT);
    socket.emit(UNBLUR_CARDS, boardId);
  }

  getIcon(name) {
    switch (name) {
      case EXPORT_BOARD_SETTING:
        return <ExportBoardIcon />;
      case UNBLUR_CARDS_SETTING:
        return <UnblurCardsIcon />;
      default:
        return null;
    }
  }

  getOnClick(name, boardId) {
    switch (name) {
      case EXPORT_BOARD_SETTING:
        return this.openExportDialog();
      case UNBLUR_CARDS_SETTING:
        return this.handleUnblur(boardId);
      default:
        return {};
    }
  }

  render() {
    const { open } = this.state;
    const { name, boardId, fullScreen } = this.props;

    return (
      <>
        <ListItem button onClick={() => this.getOnClick(name, boardId)}>
          <ListItemIcon>{this.getIcon(name)}</ListItemIcon>
          <ListItemText primary={name} />
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

export default withMobileDialog()(SettingsItem);
