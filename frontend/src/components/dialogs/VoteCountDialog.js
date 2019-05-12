import React, { useState, useContext } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ArrowUpIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownIcon from "@material-ui/icons/ArrowDownward";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  withMobileDialog,
  Grid,
  Typography
} from "@material-ui/core";

import { isModerator, setUser } from "../../utils/roleHandlers";
import { AppContext } from "../AppContext";

function VoteCountDialog(props) {
  const { fullScreen, boardId } = props;
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useContext(AppContext);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSave() {
    setUser("maxVoteCount", state.maxVoteCount, boardId);
    handleClose();
  }

  function incrementVotes() {
    dispatch({ type: "increment" });
  }

  function decrementVotes() {
    dispatch({ type: "decrement" });
  }

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        aria-label="Set Vote Count"
        color="primary"
        onClick={handleOpen}
        disabled={!isModerator(boardId)}
      >
        <ThumbUpIcon style={{ marginRight: 5 }} />
        Vote Count
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="vote-count-dialog"
        aria-describedby="vote-count-dialog-description"
      >
        <DialogTitle id="vote-count-dialog">Set Maximum Vote Count</DialogTitle>
        <DialogContent>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography variant="body1">
                {"Maximum Vote Count is: " + state.maxVoteCount}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton
                aria-label="Increase Vote Count"
                onClick={incrementVotes}
              >
                <ArrowUpIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="Decrease Vote Count"
                onClick={decrementVotes}
              >
                <ArrowDownIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

/*class VoteCountDialog extends React.Component {
  state = { open: false };

  openDialog = () => this.setState({ open: true });

  closeDialog = () => this.setState({ open: false });

  render() {
    const { open } = this.state;
    const { boardId, fullScreen } = this.props;

    return (
      <>
        <Button
          size="small"
          variant="outlined"
          aria-label="Set Vote Count"
          color="primary"
          onClick={this.openDialog}
          disabled={!isModerator(boardId)}
        >
          <ThumbUpIcon style={{ marginRight: 5 }} />
          Vote Count
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={this.closeDialog}
          aria-labelledby="vote-count-dialog"
          aria-describedby="vote-count-dialog-description"
        >
          <DialogTitle id="vote-count-dialog">
            Set Maximum Vote Count
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Some Dialog Description here</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.closeDialog}>
              Cancel
            </Button>
            <Button color="primary" onClick={() => {}}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}*/

export default withMobileDialog()(VoteCountDialog);
