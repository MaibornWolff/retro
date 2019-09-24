import React, { useContext } from "react";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";

import { EDIT_CARD_BUTTON } from "../../../constants/testIds";
import { DialogsContext } from "../../../context/DialogsContext";

function EditItemButton(props) {
  const { id, author, content } = props;
  const { openEditItemDialog } = useContext(DialogsContext);

  return (
    <>
      <IconButton
        color="primary"
        onClick={() => openEditItemDialog(id, author, content)}
        data-testid={EDIT_CARD_BUTTON}
      >
        <EditIcon fontSize="small" />
      </IconButton>
    </>
  );
}

export default EditItemButton;
