import React, { useContext } from "react";
import UnblurIcon from "@material-ui/icons/BlurOff";
import { Button } from "@material-ui/core";

import { UNBLUR_CARDS } from "../../constants/eventNames";
import { UNBLUR_CARDS_BUTTON } from "../../constants/testIds";
import { ROLE_MODERATOR } from "../../utils/userUtils";
import { BoardContext } from "../../context/BoardContext";
import { UserContext } from "../../context/UserContext";

function UnblurCardsButton() {
  const { boardId, socket } = useContext(BoardContext);
  const { userState } = useContext(UserContext);

  function unblur() {
    socket.emit(UNBLUR_CARDS, boardId);
  }

  return (
    <Button
      size="small"
      variant="outlined"
      aria-label="Unblur Cards"
      color="primary"
      onClick={unblur}
      disabled={userState.role !== ROLE_MODERATOR}
      data-testid={UNBLUR_CARDS_BUTTON}
      fullWidth
    >
      <UnblurIcon style={{ marginRight: 5 }} />
      Toggle Blur
    </Button>
  );
}

export default UnblurCardsButton;
