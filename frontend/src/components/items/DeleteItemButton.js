import React, { useContext } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton, makeStyles } from "@material-ui/core";

import { DELETE_CARD_BUTTON } from "../../constants/testIds";
import { DialogsContext } from "../../context/DialogsContext";

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.error.main,
  },
}));

export default function DeleteItemButton(props) {
  const { id } = props;
  const { openDeleteItemDialog } = useContext(DialogsContext);
  const classes = useStyles();

  return (
    <IconButton
      size="small"
      className={classes.button}
      onClick={() => openDeleteItemDialog(id)}
      data-testid={DELETE_CARD_BUTTON}
    >
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
}
