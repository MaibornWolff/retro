import { useMemo } from "react";
import { io, Socket } from "socket.io-client";
import { useNamespace } from "./useNamespace";
import { ClientToServerEvents, ServerToClientEvents } from "@shared/socket";
import { useUserContext } from "../context/UserContext";
import { useRoomContext } from "../context/RoomContext";
import { configuration } from "@shared/configuration";
import { ApplicationState, User } from "../types/commonTypes";

interface UseSocketProps {
  state: ApplicationState;
}

export function useSocket({ state }: UseSocketProps) {
  const { user } = useUserContext();
  const { roomId } = useRoomContext();
  const socketNamespace = useNamespace();

  const socket = useMemo(() => {
    const backendUrl = configuration.backendUrl.url;
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

  function emitJoinRoom({ user, roomId }: { user: User; roomId: string }) {
    socket.emit("joinRoom", { roomId, userId: user.id });
  }

  function emitCreateRoom() {
    socket.emit("createRoom", {
      roomId,
      userId: user.id,
      isAutoAcceptEnabled: state.isAutoAcceptEnabled,
    });
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
