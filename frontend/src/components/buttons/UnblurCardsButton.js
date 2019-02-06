import React from "react";
import io from "socket.io-client";
import { Grid, Button } from "@material-ui/core";

import { LOCAL_BACKEND_ENDPOINT } from "../../utils";
import { UNBLUR_CARDS } from "../../events/event-names";

const handleUnblur = boardId => {
  const socket = io(LOCAL_BACKEND_ENDPOINT);
  socket.emit(UNBLUR_CARDS, boardId);
};

const UnblurCardsButton = props => (
  <>
    <Grid item className={props.className}>
      <Button
        size="small"
        variant="contained"
        aria-label="Unblur Cards"
        color="primary"
        onClick={() => handleUnblur(props.boardId)}
      >
        Unblur Cards
      </Button>
    </Grid>
  </>
);

export default UnblurCardsButton;
