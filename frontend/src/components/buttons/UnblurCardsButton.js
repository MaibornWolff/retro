import React, { useContext } from "react";
import UnblurIcon from "@material-ui/icons/BlurOff";
import { Grid, Button } from "@material-ui/core";

import { UNBLUR_CARDS } from "../../utils/eventNames";
import { ROLE_MODERATOR } from "../../utils/userUtils";
import { BoardContext } from "../context/BoardContext";
import { UserContext } from "../context/UserContext";

function UnblurCardsButton(props) {
  const { className } = props;
  const { boardId, socket } = useContext(BoardContext);
  const { userState } = useContext(UserContext);

  function unblur() {
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
          disabled={userState.role !== ROLE_MODERATOR}
        >
          <UnblurIcon style={{ marginRight: 5 }} />
          Toggle Blur
        </Button>
      </Grid>
    </>
  );
}

export default UnblurCardsButton;
