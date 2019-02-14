import React from "react";
import io from "socket.io-client";
import UnblurCardsIcon from "@material-ui/icons/BlurOff";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { LOCAL_BACKEND_ENDPOINT } from "../../utils";
import { UNBLUR_CARDS } from "../../events/event-names";

class UnblurCards extends React.Component {
  handleUnblur(boardId) {
    const socket = io(LOCAL_BACKEND_ENDPOINT);
    socket.emit(UNBLUR_CARDS, boardId);
  }

  render() {
    const { boardId } = this.props;

    return (
      <ListItem button onClick={() => this.handleUnblur(boardId)}>
        <ListItemIcon>
          <UnblurCardsIcon />
        </ListItemIcon>
        <ListItemText primary={"Unblur Cards"} />
      </ListItem>
    );
  }
}

export default UnblurCards;
