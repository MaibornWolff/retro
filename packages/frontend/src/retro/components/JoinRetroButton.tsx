import React from "react";
import { Button, useTheme } from "@mui/material";
import { useUserContext } from "../../common/context/UserContext";
import { useDialog } from "../hooks/useDialog";
import JoinRetroDialog from "./dialogs/JoinRetroDialog";

interface JoinRetroButtonProps {
  roomId: string;
}

export default function JoinRetroButton({ roomId }: JoinRetroButtonProps) {
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
      <JoinRetroDialog isOpen={isOpen} close={closeDialog} roomId={roomId} />
    </>
  );
}
