import React from "react";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useUserContext } from "../../../common/context/UserContext";
import { CreateColumnDialog } from "../dialogs/CreateColumnDialog";
import { useDialog } from "../../hooks/useDialog";

export default function CreateColumnButton() {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const { user } = useUserContext();
  if (user.role !== "moderator") return null;

  return (
    <>
      <Button
        variant="outlined"
        aria-label="Add Column"
        onClick={openDialog}
        disabled={user.role !== "moderator"}
        startIcon={<Add />}
        fullWidth
      >
        Add Column
      </Button>
      <CreateColumnDialog isOpen={isOpen} close={closeDialog} />
    </>
  );
}
