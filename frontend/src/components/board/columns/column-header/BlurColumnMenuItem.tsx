import React, { useContext } from "react";
import UnblurIcon from "@material-ui/icons/BlurOff";
import { MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";

import { BoardContext } from "../../../../context/BoardContext";
import { UserContext } from "../../../../context/UserContext";
import { TOGGLE_COLUMN_BLUR } from "../../../../constants/event.constants";
import { ROLE_MODERATOR } from "../../../../utils/user.utils";

type BlurColumnMenuItemProperties = {
  columnId: string;
};

const BlurColumnMenuItem = React.forwardRef(
  (props: BlurColumnMenuItemProperties, ref: any) => {
    const { boardId, socket } = useContext(BoardContext);
    const { userState } = useContext(UserContext);

    function toggleBlur() {
      socket.emit(TOGGLE_COLUMN_BLUR, boardId, props.columnId);
    }

    return (
      <MenuItem
        button
        ref={ref}
        onClick={toggleBlur}
        disabled={userState.role !== ROLE_MODERATOR}
      >
        <ListItemIcon>
          <UnblurIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Toggle Blur" />
      </MenuItem>
    );
  }
);

export default BlurColumnMenuItem;
