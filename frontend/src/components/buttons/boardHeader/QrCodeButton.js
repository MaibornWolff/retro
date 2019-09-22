import React, { useRef, useState } from "react";
import QRCode from "qrcode";
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

import { QR_CODE_BUTTON } from "../../../constants/testIds";

function QrCodeButton(props) {
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
    <div>
      <Button
        size="small"
        variant="outlined"
        aria-label="QR Code"
        color="primary"
        onClick={openDialog}
        data-testid={QR_CODE_BUTTON}
        fullWidth
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
    </div>
  );
}

export default withMobileDialog()(QrCodeButton);
