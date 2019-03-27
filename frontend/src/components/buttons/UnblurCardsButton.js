import React from "react";
import io from "socket.io-client";
import UnblurIcon from "@material-ui/icons/BlurOff";
import { Grid, Button } from "@material-ui/core";

import { BACKEND_ENDPOINT } from "../../utils";
import { UNBLUR_CARDS } from "../../events/event-names";

const unblur = boardId => {
  const socket = io(BACKEND_ENDPOINT);
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
        Unblur Cards
      </Button>
    </Grid>
  </>
);

export default UnblurCardsButton;
