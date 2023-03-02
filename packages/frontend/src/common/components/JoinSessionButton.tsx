import React from "react";
import { Button, useTheme } from "@mui/material";
import { useDialog } from "../../retro/hooks/useDialog";
import { useUserContext } from "../context/UserContext";
import JoinSessionDialog from "./JoinSessionDialog";

interface JoinSessionButtonProps {
  roomId: string;
  navigateToRoom: () => void;
  handleAddToWaitingList: ({ userId, userName }: { userId: string; userName: string }) => void;
}

export default function JoinSessionButton({
  roomId,
  navigateToRoom,
  handleAddToWaitingList,
}: JoinSessionButtonProps) {
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
      <JoinSessionDialog
        isOpen={isOpen}
        close={closeDialog}
        roomId={roomId}
        handleAddToWaitingList={handleAddToWaitingList}
        navigateToRoom={navigateToRoom}
      />
    </>
  );
}
