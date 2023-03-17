import { useMemo } from "react";
import { io, Socket } from "socket.io-client";
import { backendUrl } from "./usePeerToPeer";
import { useNamespace } from "./useNamespace";
import { ClientToServerEvents, ServerToClientEvents } from "@shared/socket";
import { useUserContext } from "../context/UserContext";
import { useRoomContext } from "../context/RoomContext";
import { User } from "../types/commonTypes";

export function useSocket() {
  const { user } = useUserContext();
  const { roomId } = useRoomContext();
  const socketNamespace = useNamespace();

  const socket = useMemo(() => {
    console.debug(`Established socket connection with: ${backendUrl}`);
    return io(`${backendUrl}/${socketNamespace}`) as Socket<
      ServerToClientEvents,
      ClientToServerEvents
    >;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function emitRejectJoinUser(userId: string) {
    socket.emit("rejectJoinRequest", { roomId, userId });
  }

  function emitAcceptJoinUser(userId: string) {
    socket.emit("acceptJoinRequest", { roomId, userId });
  }

  // it would be nicer if we did not need the parameters here
  // but after clicking join room in JoinRoomDialog, they seem to be not yet set.
  function emitJoinRoom({ user, roomId }: { user: User; roomId: string }) {
    socket.emit("joinRoom", { roomId, userId: user.id });
  }

  function emitCreateRoom({
    user,
    roomId,
    isAutoAcceptActivated,
  }: {
    user: User;
    roomId: string;
    isAutoAcceptActivated: boolean;
  }) {
    socket.emit("createRoom", { roomId, userId: user.id, isAutoAcceptActivated });
  }

  function emitRequestJoinRoom() {
    socket.emit("requestJoinRoom", { roomId, userId: user.id, userName: user.name });
  }

  function emitDataListenerEstablished(senderUserId: string) {
    socket.emit("dataListenerEstablished", {
      roomId,
      receiverUserId: user.id,
      senderUserId,
    });
  }

  return {
    socket,
    emitAcceptJoinUser,
    emitJoinRoom,
    emitRejectJoinUser,
    emitDataListenerEstablished,
    emitRequestJoinRoom,
    emitCreateRoom,
  };
}
