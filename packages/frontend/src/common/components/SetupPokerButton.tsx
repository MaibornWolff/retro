import React from "react";
import { useRoomIdFromPath } from "../hooks/useRoomIdFromPath";
import { useUserContext } from "../context/UserContext";
import JoinPokerButton from "../../poker/components/JoinPokerButton";
import CreatePokerButton from "../../poker/components/CreatePokerButton";

export default function SetupPokerButton() {
  const { user } = useUserContext();
  const roomId = useRoomIdFromPath();

  if (user.id) return null;

  return roomId ? <JoinPokerButton roomId={roomId} /> : <CreatePokerButton />;
}
