import React, { useContext, useState } from "react";
import BuildIcon from "@material-ui/icons/Build";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  ListItemIcon,
  ListItemText,
  MenuItem,
  useMediaQuery,
  useTheme,
  Button,
} from "@material-ui/core";

import { PokerContext } from "../../context/PokerContext";
import { POKER_ROLE_MODERATOR } from "../../utils/poker.utils";

export default function PokerPointsSetupButton() {
  const [open, setOpen] = useState(false);
  const { pokerState } = useContext(PokerContext);
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("sm"));

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function handleUnitChange() {
    console.log("clicked handle unit change button");
  }

  return (
    <>
      <MenuItem
        aria-label="Change Poker Unit"
        color="primary"
        onClick={openDialog}
        disabled={pokerState.role !== POKER_ROLE_MODERATOR}
      >
        <ListItemIcon>
          <BuildIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Change Poker Unit" />
      </MenuItem>
      <Dialog
        fullWidth
        maxWidth="xs"
        fullScreen={fullScreen}
        open={open}
        onClose={closeDialog}
        aria-labelledby="poker-unit-dialog"
      >
        <DialogTitle id="poker-unit-dialog">Change Poker Unit</DialogTitle>
        <DialogContent>
          Select the desired unit for your planning poker
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleUnitChange}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
