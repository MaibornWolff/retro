import { Button, useTheme } from "@mui/material";
import React from "react";
import { useDialog } from "../../../retro/hooks/useDialog";
import { useUserContext } from "../../context/UserContext";
import { useNamespace } from "../../hooks/useNamespace";
import { CreatePokerSessionDialog } from "../../../poker/components/dialogs/CreatePokerSessionDialog";
import { CreateRetroSessionDialog } from "../../../retro/components/dialogs/CreateRetroSessionDialog";

export function CreateSessionButton() {
  const { isOpen, closeDialog, openDialog } = useDialog(true);
  const { user } = useUserContext();
  const theme = useTheme();
  const namespace = useNamespace();

  return (
    <>
      {!isOpen && !user.id && (
        <Button
          variant="outlined"
          onClick={openDialog}
          disabled={Boolean(user.name)}
          sx={{
            margin: theme.spacing(1),
            borderRadius: "10px",
          }}
          fullWidth
        >
          Create Session
        </Button>
      )}

      {namespace === "poker" && <CreatePokerSessionDialog isOpen={isOpen} close={closeDialog} />}
      {namespace === "retro" && <CreateRetroSessionDialog isOpen={isOpen} close={closeDialog} />}
    </>
  );
}
