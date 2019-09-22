import React, { useContext } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";

import { DELETE_CARD_BUTTON } from "../../../constants/testIds";
import { DialogsContext } from "../../../context/DialogsContext";

function DeleteItemButton(props) {
  const { id } = props;
  const { openDeleteItemDialog } = useContext(DialogsContext);

  return (
    <>
      <IconButton
        color="primary"
        onClick={() => openDeleteItemDialog(id)}
        data-testid={DELETE_CARD_BUTTON}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </>
  );
}

export default DeleteItemButton;
