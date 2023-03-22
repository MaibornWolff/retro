import React, { useRef } from "react";
import QRCode from "qrcode";
import { CropFree } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@mui/material";
import { useDialog } from "../../hooks/useDialog";
import { useFullscreen } from "../../hooks/useFullscreen";

export function QrCodeButton() {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const qrCanvas = useRef<HTMLCanvasElement>(null);
  const fullScreen = useFullscreen();

  async function onRendered() {
    await QRCode.toCanvas(qrCanvas.current, window.location.href);
  }

  return (
    <>
      <MenuItem aria-label="QR Code" onClick={openDialog}>
        <ListItemIcon>
          <CropFree fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="QR Code" />
      </MenuItem>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={closeDialog}
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
          <Button onClick={closeDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
