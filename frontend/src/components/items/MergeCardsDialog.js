import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  withMobileDialog,
} from "@material-ui/core";

function MergeCardsDialog(props) {
  const { fullScreen, open, closeDialog, startMerge, stopMerge } = props;

  function mergeCards() {
    startMerge();
    closeDialog();
  }

  function abortMerge() {
    stopMerge();
    closeDialog();
  }

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xs"
        fullScreen={fullScreen}
        open={open}
        onClose={closeDialog}
        aria-labelledby="alert-merge-card-dialog"
        aria-describedby="alert-merge-card-dialog-description"
      >
        <DialogTitle id="alert-merge-card-dialog">{"Merge Cards?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-merge-card-dialog-description">
            You are about to merge cards!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={abortMerge} color="primary">
            Cancel
          </Button>
          <Button onClick={mergeCards} color="primary" autoFocus>
            Merge
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withMobileDialog()(MergeCardsDialog);
