import React, { useContext } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";

import { DELETE_CARD_BUTTON } from "../../constants/testIds";
import { DialogsContext } from "../../context/DialogsContext";

export default function DeleteItemButton(props) {
  const { id, style } = props;
  const { openDeleteItemDialog } = useContext(DialogsContext);

  return (
    <IconButton
      className={style}
      onClick={() => openDeleteItemDialog(id)}
      data-testid={DELETE_CARD_BUTTON}
    >
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
}
