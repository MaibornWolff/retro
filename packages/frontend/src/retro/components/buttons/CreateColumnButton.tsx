import React from "react";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useUserContext } from "../../../common/context/UserContext";
import { CreateColumnDialog } from "../dialogs/CreateColumnDialog";
import { useDialog } from "../../hooks/useDialog";
import { isModerator } from "../../../common/utils/participantsUtils";

export default function CreateColumnButton() {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const { user } = useUserContext();
  if (!isModerator(user)) return null;

  return (
    <>
      <Button
        variant="outlined"
        aria-label="Add Column"
        onClick={openDialog}
        disabled={!isModerator(user)}
        startIcon={<Add />}
        sx={{ width: "100%" }}
      >
        Add Column
      </Button>
      <CreateColumnDialog isOpen={isOpen} close={closeDialog} />
    </>
  );
}
