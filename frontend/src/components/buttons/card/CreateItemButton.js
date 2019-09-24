import React, { useContext } from "react";
import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "@material-ui/core";

import { CREATE_CARD_BUTTON } from "../../../constants/testIds";
import { UserContext } from "../../../context/UserContext";
import { DialogsContext } from "../../../context/DialogsContext";

function CreateItemButton(props) {
  const { columnId } = props;
  const { userState } = useContext(UserContext);
  const { openCreateItemDialog } = useContext(DialogsContext);

  return (
    <>
      <IconButton
        color="inherit"
        onClick={() => openCreateItemDialog(columnId, userState.name)}
        data-testid={CREATE_CARD_BUTTON}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </>
  );
}

export default CreateItemButton;
