import React, { useContext } from "react";
import UnblurIcon from "@material-ui/icons/BlurOff";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { BoardContext } from "../context/BoardContext";
import { UserContext } from "../context/UserContext";
import { UNBLUR_CARDS } from "../constants/event.constants";
import { ROLE_MODERATOR } from "../utils/user.utils";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

function UnblurCardsButton() {
  const { boardId, socket } = useContext(BoardContext);
  const { userState } = useContext(UserContext);
  const classes = useStyles();

  function unblur() {
    socket.emit(UNBLUR_CARDS, boardId);
  }

  return (
    <Button
      fullWidth
      className={classes.button}
      variant="text"
      aria-label="Unblur Cards"
      color="primary"
      onClick={unblur}
      disabled={userState.role !== ROLE_MODERATOR}
      startIcon={<UnblurIcon />}
    >
      <Typography variant="body1">Blur/Unblur Board</Typography>
    </Button>
  );
}

export default UnblurCardsButton;
