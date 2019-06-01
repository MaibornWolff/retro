import React, { useContext } from "react";
import UnblurIcon from "@material-ui/icons/BlurOff";
import { Grid, Button } from "@material-ui/core";

import { connectSocket } from "../../utils";
import { UNBLUR_CARDS } from "../../utils/eventNames";
import { isModerator } from "../../utils/roleHandlers";
import { BoardContext } from "../context/BoardContext";

function UnblurCardsButton(props) {
  const { className } = props;
  const boardId = useContext(BoardContext);

  function unblur() {
    const socket = connectSocket(boardId);
    socket.emit(UNBLUR_CARDS, boardId);
  }

  return (
    <>
      <Grid item className={className}>
        <Button
          size="small"
          variant="outlined"
          aria-label="Unblur Cards"
          color="primary"
          onClick={unblur}
          disabled={!isModerator(boardId)}
        >
          <UnblurIcon style={{ marginRight: 5 }} />
          Toggle Blur
        </Button>
      </Grid>
    </>
  );
}

export default UnblurCardsButton;
