import { Button, useTheme } from "@mui/material";
import React from "react";
import { useUserContext } from "../../common/context/UserContext";
import { useDialog } from "../../retro/hooks/useDialog";
import CreatePokerDialog from "./dialogs/CreatePokerDialog";

export default function CreatePokerButton() {
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
      <CreatePokerDialog isOpen={isOpen} close={closeDialog} />
    </>
  );
}
