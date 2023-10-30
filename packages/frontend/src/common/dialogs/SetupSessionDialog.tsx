import React from "react";
import { JoinSessionDialog } from "./JoinSessionDialog";
import { CreateSessionDialog } from "./CreateSessionDialog";
import { useUserContext } from "../context/UserContext";
import { useRoomIdFromPath } from "../hooks/useRoomIdFromPath";

interface SetupSessionButtonProps {
  onAddToWaitingList: ({ userId, userName }: { userId: string; userName: string }) => void;
}

export function SetupSessionDialog({ onAddToWaitingList }: SetupSessionButtonProps) {
  const { user } = useUserContext();
  const roomId = useRoomIdFromPath();

  if (user.id) return null;

  return roomId ? (
    <JoinSessionDialog onAddToWaitingList={onAddToWaitingList} />
  ) : (
    <CreateSessionDialog />
  );
}
