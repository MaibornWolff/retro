import React from "react";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  withMobileDialog
} from "@material-ui/core";
import QRCode from "qrcode";

class QrCodeDialog extends React.Component {
  state = { open: false };

  constructor(props) {
    super(props);
    this.qrCanvas = React.createRef();
  }

  openDialog = () => this.setState({ open: true });

  closeDialog = () => this.setState({ open: false });

  onRendered = () => {
    const href = window.location.href;
    QRCode.toCanvas(this.qrCanvas.current, href);
  }

  render() {
    const { open } = this.state;
    return (
      <>
        <Button
          size="small"
          variant="outlined"
          aria-label="QR Code"
          color="primary"
          onClick={this.openDialog}
          data-testid="qr-code-btn"
        >
          <PhotoCameraIcon style={{ marginRight: 5 }} />
          QR Code
        </Button>
        <Dialog
          fullScreen={false}
          open={open}
          onClose={this.closeDialog}
          onRendered={this.onRendered}
          aria-labelledby="qr-code-dialog"
          aria-describedby="qr-code-dialog-description"
        >
          <DialogTitle id="qr-code-dialog">QR Code</DialogTitle>
          <DialogContent>
            <DialogContentText id="board-export-dialog-description">
              <canvas ref={this.qrCanvas}></canvas>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.closeDialog}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withMobileDialog()(QrCodeDialog);
