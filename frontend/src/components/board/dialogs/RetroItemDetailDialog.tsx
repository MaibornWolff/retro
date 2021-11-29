import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useContext } from "react";
import { BoardContext } from "../../../context/BoardContext";
import { DialogsContext } from "../../../context/DialogContext";
import Comments from "../items/Comments";

export default function RetroItemDetailDialog() {
  const { dialogsState, closeRetroItemDetailDialog } =
    useContext(DialogsContext);
  const { boardState } = useContext(BoardContext);
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("sm"));

  function handleClose() {
    closeRetroItemDetailDialog();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      open={dialogsState.isRetroItemDetailDialogOpen}
      onClose={handleClose}
      aria-labelledby="new-card-dialog"
    >
      <DialogTitle id="new-card-dialog">
        {dialogsState.itemAuthor}&apos;s Card Comments
      </DialogTitle>
      <DialogContent>
        <Comments
          cardId={dialogsState.itemId ?? ""}
          comments={boardState.comments[dialogsState.itemId ?? ""] ?? []}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
