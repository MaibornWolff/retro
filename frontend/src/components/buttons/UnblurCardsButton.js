import React from "react";
import UnblurIcon from "@material-ui/icons/BlurOff";
import { Grid, Button } from "@material-ui/core";

import { connectSocket } from "../../utils";
import { UNBLUR_CARDS } from "../../utils/eventNames";
import { isModerator } from "../../utils/roleHandlers";

const unblur = boardId => {
  const socket = connectSocket(boardId);
  socket.emit(UNBLUR_CARDS, boardId);
};

const UnblurCardsButton = props => (
  <>
    <Grid item className={props.className}>
      <Button
        size="small"
        variant="outlined"
        aria-label="Unblur Cards"
        color="primary"
        onClick={() => unblur(props.boardId)}
        disabled={!isModerator(props.boardId)}
      >
        <UnblurIcon style={{ marginRight: 5 }} />
        Toggle Blur
      </Button>
    </Grid>
  </>
);

export default UnblurCardsButton;
