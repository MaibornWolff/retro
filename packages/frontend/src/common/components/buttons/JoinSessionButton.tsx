import React from "react";
import { Button, useTheme } from "@mui/material";
import { useUserContext } from "../../context/UserContext";
import { JoinSessionDialog } from "../../dialogs/JoinSessionDialog";
import { useDialog } from "../../hooks/useDialog";

interface JoinSessionButtonProps {
  roomId: string;
  navigateToRoom: () => void;
  onAddToWaitingList: ({ userId, userName }: { userId: string; userName: string }) => void;
}

export function JoinSessionButton({
  roomId,
  navigateToRoom,
  onAddToWaitingList,
}: JoinSessionButtonProps) {
  const { isOpen, closeDialog, openDialog } = useDialog(true);
  const { user } = useUserContext();
  const theme = useTheme();

  return (
    <>
      {!isOpen && !user.id && (
        <Button
          variant="contained"
          onClick={openDialog}
          disabled={Boolean(user.name)}
          sx={{
            margin: theme.spacing(1),
            borderRadius: "10px",
            boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
          }}
          fullWidth
        >
          Join Session
        </Button>
      )}
      <JoinSessionDialog
        isOpen={isOpen}
        close={closeDialog}
        roomId={roomId}
        onAddToWaitingList={onAddToWaitingList}
        navigateToRoom={navigateToRoom}
      />
    </>
  );
}
