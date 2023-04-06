import React from "react";
import { JoinSessionButton } from "./JoinSessionButton";
import { CreateSessionButton } from "./CreateSessionButton";
import { useUserContext } from "../../context/UserContext";

interface SetupSessionButtonProps {
  roomId?: string;
  navigateToRoom: () => void;
  onAddToWaitingList: ({ userId, userName }: { userId: string; userName: string }) => void;
  isAutoAcceptEnabled: boolean;
}

export function SetupSessionButton({
  navigateToRoom,
  onAddToWaitingList,
  roomId,
  isAutoAcceptEnabled,
}: SetupSessionButtonProps) {
  const { user } = useUserContext();

  if (user.id) return null;

  return roomId ? (
    <JoinSessionButton
      roomId={roomId}
      navigateToRoom={navigateToRoom}
      onAddToWaitingList={onAddToWaitingList}
      isAutoAcceptEnabled={isAutoAcceptEnabled}
    />
  ) : (
    <CreateSessionButton />
  );
}
