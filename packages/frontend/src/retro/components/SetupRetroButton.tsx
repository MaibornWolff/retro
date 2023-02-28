import React from "react";
import { useRoomIdFromPath } from "../../common/hooks/useRoomIdFromPath";
import { useUserContext } from "../../common/context/UserContext";
import JoinRetroButton from "./JoinRetroButton";
import CreateRetroButton from "./CreateRetroButton";

export default function SetupRetroButton() {
  const { user } = useUserContext();
  const roomId = useRoomIdFromPath();

  if (user.id) return null;

  return roomId ? <JoinRetroButton roomId={roomId} /> : <CreateRetroButton />;
}
