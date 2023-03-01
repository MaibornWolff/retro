import React from "react";
import { Button, useTheme } from "@mui/material";
import { useDialog } from "../../retro/hooks/useDialog";
import JoinPokerDialog from "./dialogs/JoinPokerDialog";
import { useUserContext } from "../../common/context/UserContext";

interface JoinPokerButtonProps {
  roomId: string;
}

export default function JoinPokerButton({ roomId }: JoinPokerButtonProps) {
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
          Join Session
        </Button>
      )}
      <JoinPokerDialog isOpen={isOpen} close={closeDialog} roomId={roomId} />
    </>
  );
}
