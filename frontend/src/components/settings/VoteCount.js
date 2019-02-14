import React, { useState, useContext } from "react";
import ThumbsUpIcon from "@material-ui/icons/ThumbUp";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  DialogContentText
} from "@material-ui/core";

import { AppContext } from "../AppContext";

const VoteCount = props => {
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useContext(AppContext);

  const inc = () => dispatch({ type: "increment" });

  const dec = () => dispatch({ type: "decrement" });

  return (
    <>
      <ListItem button onClick={() => setOpen(true)}>
        <ListItemIcon>
          <ThumbsUpIcon />
        </ListItemIcon>
        <ListItemText primary={"Vote Count"} />
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="vote-count-dialog"
        >
          <DialogTitle id="vote-count-dialog">Vote Count</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {"Vote Count is " + state.voteCount}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={dec}>
              -
            </Button>
            <Button color="primary" onClick={inc}>
              +
            </Button>
          </DialogActions>
        </Dialog>
      </ListItem>
    </>
  );
};

export default VoteCount;
