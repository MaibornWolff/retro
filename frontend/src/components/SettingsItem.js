import React from "react";
import io from "socket.io-client";
import ExportBoardIcon from "@material-ui/icons/PictureAsPdf";
import UnblurCardsIcon from "@material-ui/icons/BlurOff";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { LOCAL_BACKEND_ENDPOINT } from "../utils";
import { UNBLUR_CARDS } from "../events/event-names";

const EXPORT_BOARD_SETTING = "Export Board";
const UNBLUR_CARDS_SETTING = "Unblur Cards";

const getIcon = name => {
  switch (name) {
    case EXPORT_BOARD_SETTING:
      return <ExportBoardIcon />;
    case UNBLUR_CARDS_SETTING:
      return <UnblurCardsIcon />;
    default:
      return null;
  }
};

const handleUnblur = boardId => {
  const socket = io(LOCAL_BACKEND_ENDPOINT);
  socket.emit(UNBLUR_CARDS, boardId);
};

const getOnClick = (name, boardId) => {
  if (name === UNBLUR_CARDS_SETTING) return handleUnblur(boardId);
  return {};
};

const SettingsItems = props => (
  <ListItem button onClick={() => getOnClick(props.name, props.boardId)}>
    <ListItemIcon>{getIcon(props.name)}</ListItemIcon>
    <ListItemText primary={props.name} />
  </ListItem>
);

export default SettingsItems;
