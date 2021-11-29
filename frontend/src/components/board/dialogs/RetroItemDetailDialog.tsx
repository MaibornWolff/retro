import {
  Button, Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, makeStyles,
  Theme, useMediaQuery,
  useTheme
} from "@material-ui/core";
import React, { useContext } from "react";
import { BoardContext } from "../../../context/BoardContext";
import { ColorThemeContext } from "../../../context/ColorThemeContext";
import { DialogsContext } from "../../../context/DialogContext";
import Comments from "../items/Comments";

const getCardBorderColor = (colorTheme: Theme, theme: Theme) => {
  if (colorTheme.palette.type === "dark") {
    return theme.palette.secondary.light;
  } else {
    return "lightgrey";
  }
};

const useStyles = makeStyles((theme) => ({
  card: (colorTheme: Theme) => ({
    border: `1px solid ${getCardBorderColor(colorTheme, theme)}`,
  }),
  cardHeader: {
    padding: "8px",
    paddingLeft: "1em",
  },
}));

export default function RetroItemDetailDialog() {
  const { dialogsState, closeRetroItemDetailDialog } =
    useContext(DialogsContext);
  const { boardState } = useContext(BoardContext);
  const { currentTheme } = useContext(ColorThemeContext);
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("sm"));
  const classes = useStyles(currentTheme);

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
