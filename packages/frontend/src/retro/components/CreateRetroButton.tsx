import React from "react";
import { Button, useTheme } from "@mui/material";
import { useUserContext } from "../../common/context/UserContext";
import { useDialog } from "../hooks/useDialog";
import CreateRetroDialog from "./dialogs/CreateRetroDialog";

export default function CreateRetroButton() {
  const { isOpen, closeDialog, openDialog } = useDialog(true);
  const { user } = useUserContext();
  const theme = useTheme();

  return (
    <>
      {!isOpen && !user.id && (
        <Button
          color="primary"
          variant="outlined"
          onClick={openDialog}
          disabled={Boolean(user.name)}
          sx={{
            margin: theme.spacing(1),
          }}
        >
          Create Session
        </Button>
      )}
      <CreateRetroDialog isOpen={isOpen} close={closeDialog} />
    </>
  );
}
