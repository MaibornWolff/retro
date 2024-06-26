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
import React from "react";
import QRCode from "react-qr-code";

export function QrCodeDialog({ isOpen, close }: DialogProps) {
  const fullScreen = useFullscreen();

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={close}
      aria-labelledby="qr-code-dialog"
      aria-describedby="qr-code-dialog-description"
    >
      <DialogTitle id="qr-code-dialog">QR Code</DialogTitle>
      <DialogContent>
        <DialogContentText id="retro-export-dialog-description">
          <QRCode value={window.location.href} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
