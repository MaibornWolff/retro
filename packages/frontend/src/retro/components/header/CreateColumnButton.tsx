import React from "react";
import { Add } from "@mui/icons-material";
import { Button, Typography, useTheme } from "@mui/material";
import { useUserContext } from "../../../common/context/UserContext";
import { CreateColumnDialog } from "../dialogs/CreateColumnDialog";
import { useDialog } from "../../hooks/useDialog";

export default function CreateColumnButton() {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const { user } = useUserContext();
  const theme = useTheme();
  if (user.role !== "moderator") return null;

  return (
    <>
      <Button
        variant="outlined"
        aria-label="Add Column"
        onClick={openDialog}
        disabled={user.role !== "moderator"}
        sx={{ marginRight: theme.spacing(1) }}
        startIcon={<Add />}
      >
        Add Column
      </Button>
      <CreateColumnDialog isOpen={isOpen} close={closeDialog} />
    </>
  );
}
