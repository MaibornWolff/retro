import { IconButton } from "@material-ui/core";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import React, { useContext } from "react";
import { MARK_CARD_DISCUSSED } from "../../../constants/event.constants";
import { BoardContext } from "../../../context/BoardContext";

type MarkItemAsDiscussedButtonProps = {
  id: string;
};

export default function MarkAsDiscussedButton(
  props: MarkItemAsDiscussedButtonProps
) {
  const { id } = props;
  const { boardId, socket } = useContext(BoardContext);

  function handleClick() {
    socket.emit(MARK_CARD_DISCUSSED, id, boardId);
  }

  return (
    <IconButton size="small" color="inherit" onClick={() => handleClick()}>
      <LibraryAddCheckIcon fontSize="small" />
    </IconButton>
  );
}
