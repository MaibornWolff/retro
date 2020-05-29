import React, { useRef, useState } from "react";
import QRCode from "qrcode";
import QrCodeIcon from "@material-ui/icons/CropFree";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

export default function QrCodeButton() {
  const [open, setOpen] = useState(false);
  const qrCanvas = useRef<HTMLCanvasElement>(null);
  const classes = useStyles();
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("sm"));

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
        fullWidth
        variant="text"
        aria-label="QR Code"
        color="primary"
        onClick={openDialog}
        className={classes.button}
        startIcon={<QrCodeIcon />}
      >
        <Typography variant="body1">Get QR Code</Typography>
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
