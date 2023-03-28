import { DialogProps } from "../../../common/types/commonTypes";
import { useFullscreen } from "../../hooks/useFullscreen";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useRef } from "react";
import QRCode from "qrcode";

export function QrCodeDialog({ isOpen, close }: DialogProps) {
  const fullScreen = useFullscreen();
  const qrCanvas = useRef<HTMLCanvasElement>(null);

  async function onRendered() {
    await QRCode.toCanvas(qrCanvas.current, window.location.href);
  }
  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={close}
      ref={onRendered}
      aria-labelledby="qr-code-dialog"
      aria-describedby="qr-code-dialog-description"
    >
      <DialogTitle id="qr-code-dialog">QR Code</DialogTitle>
      <DialogContent>
        <DialogContentText id="retro-export-dialog-description">
          <canvas ref={qrCanvas} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={close}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
