import React from "react";
import { Button, useTheme } from "@mui/material";
import { useDialog } from "../../retro/hooks/useDialog";
import PokerJoinDialog from "./dialogs/PokerJoinDialog";
import { useUserContext } from "../../common/context/UserContext";

export default function PokerJoinButton() {
  const { isOpen, closeDialog, openDialog } = useDialog(true);
  const theme = useTheme();
  const { user } = useUserContext();

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
          Join Session
        </Button>
      )}
      <PokerJoinDialog isOpen={isOpen} close={closeDialog} />
    </>
  );
}
