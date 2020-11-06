import React, { useContext } from "react";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";

import { DialogsContext } from "../../../context/DialogContext";

type EditItemButtonProps = {
  id: string;
  author: string;
  content: string;
};

export default function EditItemButton(props: EditItemButtonProps) {
  const { id, author, content } = props;
  const { openEditItemDialog } = useContext(DialogsContext);

  return (
    <IconButton
      color="inherit"
      size="small"
      onClick={() => openEditItemDialog(id, author, content)}
    >
      <EditIcon fontSize="small" />
    </IconButton>
  );
}
