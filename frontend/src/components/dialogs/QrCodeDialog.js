import React, { useRef, useState } from "react";
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

function QrCodeDialog(props) {
  const { fullScreen } = props;
  const [open, setOpen] = useState(false);
  const qrCanvas = useRef();

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function onRendered() {
    QRCode.toCanvas(qrCanvas.current, window.location.href);
  }

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        aria-label="QR Code"
        color="primary"
        onClick={openDialog}
        data-testid="qr-code-btn"
      >
        <PhotoCameraIcon style={{ marginRight: 5 }} />
        QR Code
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={closeDialog}
        onRendered={onRendered}
        aria-labelledby="qr-code-dialog"
        aria-describedby="qr-code-dialog-description"
      >
        <DialogTitle id="qr-code-dialog">QR Code</DialogTitle>
        <DialogContent>
          <DialogContentText id="board-export-dialog-description">
            <canvas ref={qrCanvas} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={closeDialog}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withMobileDialog()(QrCodeDialog);
