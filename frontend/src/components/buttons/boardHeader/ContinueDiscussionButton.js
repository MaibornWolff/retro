import React, { useContext, useState } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbsUpDownIcon from "@material-ui/icons/ThumbsUpDown";
import {
  withMobileDialog,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  makeStyles,
  DialogActions
} from "@material-ui/core";

import { BoardContext } from "../../../context/BoardContext";
import { UserContext } from "../../../context/UserContext";
import { ROLE_MODERATOR } from "../../../utils/userUtils";
import {
  SHOW_CONTINUE_DISCUSSION,
  CONTINUE_DISCUSSION_YES,
  CONTINUE_DISCUSSION_NO,
  CONTINUE_DISCUSSION_ABSTAIN
} from "../../../constants/eventNames";

const useStyles = makeStyles(() => ({
  button: {
    width: "12em"
  }
}));

function ContinueDiscussionButton(props) {
  const { fullScreen } = props;
  const [isDisabled, setDisabled] = useState(false);
  const { userState } = useContext(UserContext);
  const { boardId, socket, boardState } = useContext(BoardContext);
  const classes = useStyles();

  // TODO: setDisable(false) for all users
  function toggleDialog() {
    if (userState.role === ROLE_MODERATOR) {
      socket.emit(SHOW_CONTINUE_DISCUSSION, boardId);
    }
  }

  function disableVoting() {
    setDisabled(true);
  }

  function handleYesClick() {
    socket.emit(CONTINUE_DISCUSSION_YES, boardId);
    disableVoting();
  }

  function handleNoClick() {
    socket.emit(CONTINUE_DISCUSSION_NO, boardId);
    disableVoting();
  }

  function handleAbstainClick() {
    socket.emit(CONTINUE_DISCUSSION_ABSTAIN, boardId);
    disableVoting();
  }

  return (
    <div>
      <Button
        size="small"
        variant="outlined"
        aria-label="Continue Discussion"
        color="primary"
        onClick={toggleDialog}
        disabled={userState.role !== ROLE_MODERATOR}
        fullWidth
      >
        <ThumbsUpDownIcon style={{ marginRight: 5 }} />
        Roman Vote
      </Button>
      <Dialog
        fullWidth
        fullScreen={fullScreen}
        open={boardState.showContinueDiscussion}
        aria-labelledby="continue-discussion-dialog"
        aria-describedby="continue-discussion-description"
      >
        <DialogTitle id="continue-discussion-dialog">Continue with this discussion?</DialogTitle>
        <DialogContent>
          <DialogContentText id="continue-discussion-description">
            Select your choice below
          </DialogContentText>
          <Grid container direction="row" alignItems="flex-start" justify="space-evenly">
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                size="small"
                className={classes.button}
                aria-label="Yes I want to continue with the discussion"
                onClick={handleYesClick}
                disabled={isDisabled}
              >
                <ThumbUpIcon style={{ marginRight: 5 }} />
                Yes - {boardState.continueDiscussionVotes.yes}
              </Button>
            </Grid>
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                size="small"
                className={classes.button}
                aria-label="No I do not want to continue with the discussion"
                onClick={handleNoClick}
                disabled={isDisabled}
              >
                <ThumbDownIcon style={{ marginRight: 5 }} />
                No - {boardState.continueDiscussionVotes.no}
              </Button>
            </Grid>
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                size="small"
                className={classes.button}
                aria-label="I abstain from voting"
                onClick={handleAbstainClick}
                disabled={isDisabled}
              >
                <ThumbsUpDownIcon style={{ marginRight: 5 }} />
                Abstain - {boardState.continueDiscussionVotes.abstain}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={toggleDialog}
            disabled={userState.role !== ROLE_MODERATOR}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withMobileDialog()(ContinueDiscussionButton);
