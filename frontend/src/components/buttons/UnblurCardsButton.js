import React from "react";
import UnblurIcon from "@material-ui/icons/BlurOff";
import { Grid, Button } from "@material-ui/core";

import { socket_connect } from "../../utils";
import { UNBLUR_CARDS } from "../../events/event-names";

const unblur = boardId => {
  const socket = socket_connect(boardId);
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
      >
        <UnblurIcon style={{ marginRight: 5 }} />
        Toggle Blur
      </Button>
    </Grid>
  </>
);

export default UnblurCardsButton;
