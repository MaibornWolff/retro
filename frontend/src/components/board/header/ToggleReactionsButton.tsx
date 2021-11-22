import { ListItemIcon, ListItemText, MenuItem } from "@material-ui/core";
import { EmojiEmotions } from "@material-ui/icons";
import React, { useContext } from "react";
import { TOGGLE_REACTIONS } from "../../../constants/event.constants";
import { BoardContext } from "../../../context/BoardContext";
import { UserContext } from "../../../context/UserContext";
import { ROLE_MODERATOR } from "../../../utils/user.utils";

const ToggleReactionsButton = React.forwardRef((props: unknown, ref: any) => {
  const { boardId, socket } = useContext(BoardContext);
  const { userState } = useContext(UserContext);

  function toggleReactions() {
    socket.emit(TOGGLE_REACTIONS, boardId);
  }

  return (
    <MenuItem
      ref={ref}
      aria-label="Toggle Reactions"
      color="primary"
      onClick={toggleReactions}
      disabled={userState.role !== ROLE_MODERATOR}
    >
      <ListItemIcon>
        <EmojiEmotions fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="Toggle Reactions" />
    </MenuItem>
  );
});

export default ToggleReactionsButton;
