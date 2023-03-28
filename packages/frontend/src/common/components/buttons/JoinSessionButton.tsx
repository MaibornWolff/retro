import React from "react";
import { useUserContext } from "../../context/UserContext";
import { JoinSessionDialog } from "../../dialogs/JoinSessionDialog";
import { useDialog } from "../../hooks/useDialog";
import { ActionButton } from "./ActionButton";
import { PlayArrow } from "@mui/icons-material";

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

  return (
    <>
      {!isOpen && !user.id && (
        <ActionButton
          onClick={openDialog}
          label="Join Session"
          isDisabled={Boolean(user.name)}
          icon={<PlayArrow />}
        />
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
