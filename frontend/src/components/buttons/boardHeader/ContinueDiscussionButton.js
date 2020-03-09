import React, { useContext } from "react";
import ThumbsUpDownIcon from "@material-ui/icons/ThumbsUpDown";
import {
  withMobileDialog,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText
} from "@material-ui/core";

import { BoardContext } from "../../../context/BoardContext";
import { UserContext } from "../../../context/UserContext";
import { ROLE_MODERATOR } from "../../../utils/userUtils";
import { SHOW_CONTINUE_DISCUSSION } from "../../../constants/eventNames";

function ContinueDiscussionButton(props) {
  const { fullScreen } = props;
  const { userState } = useContext(UserContext);
  const { boardId, socket, boardState } = useContext(BoardContext);

  function toggleDialog() {
    if (userState.role === ROLE_MODERATOR) {
      socket.emit(SHOW_CONTINUE_DISCUSSION, boardId);
    }
  }

  return (
    <div>
      <Button
        size="small"
        variant="outlined"
        aria-label="Continue Discussion"
        color="primary"
        onClick={toggleDialog}
        disabled
        // disabled={userState.role !== ROLE_MODERATOR}
        fullWidth
      >
        <ThumbsUpDownIcon style={{ marginRight: 5 }} />
        Continue
      </Button>
      <Dialog
        fullWidth
        maxWidth="xs"
        fullScreen={fullScreen}
        open={boardState.showContinueDiscussion}
        onClose={toggleDialog}
        aria-labelledby="continue-discussion-dialog"
        aria-describedby="continue-discussion-description"
      >
        <DialogTitle id="continue-discussion-dialog">Continue Discussion?</DialogTitle>
        <DialogContent>
          <DialogContentText id="continue-discussion-description">
            Do you want to continue with this discussion?
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withMobileDialog()(ContinueDiscussionButton);
