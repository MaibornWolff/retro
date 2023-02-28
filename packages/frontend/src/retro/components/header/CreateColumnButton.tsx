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

  return (
    <>
      <Button
        variant="text"
        aria-label="Add Column"
        onClick={openDialog}
        disabled={user.role !== "moderator"}
        sx={{ marginRight: theme.spacing(1), textTransform: "none", color: "white" }}
        startIcon={<Add />}
      >
        <Typography color="inherit">Add Column</Typography>
      </Button>
      <CreateColumnDialog isOpen={isOpen} close={closeDialog} />
    </>
  );
}
