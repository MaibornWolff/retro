import React from "react";
import { useUserContext } from "../context/UserContext";
import JoinSessionButton from "./JoinSessionButton";
import CreateSessionButton from "./CreateSessionButton";

interface SetupSessionButtonProps {
  roomId?: string;
  navigateToRoom: () => void;
  handleAddToWaitingList: ({ userId, userName }: { userId: string; userName: string }) => void;
}

export default function SetupSessionButton({
  navigateToRoom,
  handleAddToWaitingList,
  roomId,
}: SetupSessionButtonProps) {
  const { user } = useUserContext();

  if (user.id) return null;

  return roomId ? (
    <JoinSessionButton
      roomId={roomId}
      navigateToRoom={navigateToRoom}
      handleAddToWaitingList={handleAddToWaitingList}
    />
  ) : (
    <CreateSessionButton />
  );
}
