import React from "react";
import JoinSessionButton from "./JoinSessionButton";
import CreateSessionButton from "./CreateSessionButton";
import { useUserContext } from "../../context/UserContext";
import { User } from "../../types/commonTypes";

interface SetupSessionButtonProps {
  roomId?: string;
  navigateToRoom: () => void;
  onAddToWaitingList: ({ userId, userName }: { userId: string; userName: string }) => void;
  isAutoAllowActivated: boolean;
  onJoinRoom: ({ user, roomId }: { user: User; roomId: string }) => void;
}

export default function SetupSessionButton({
  navigateToRoom,
  onAddToWaitingList,
  roomId,
  isAutoAllowActivated,
  onJoinRoom,
}: SetupSessionButtonProps) {
  const { user } = useUserContext();

  if (user.id) return null;

  return roomId ? (
    <JoinSessionButton
      roomId={roomId}
      navigateToRoom={navigateToRoom}
      onAddToWaitingList={onAddToWaitingList}
      isAutoAllowActivated={isAutoAllowActivated}
      onJoinRoom={onJoinRoom}
    />
  ) : (
    <CreateSessionButton />
  );
}
