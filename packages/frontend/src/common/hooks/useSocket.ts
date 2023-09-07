import { useMemo } from "react";
import { io, Socket } from "socket.io-client";
import { useNamespace } from "./useNamespace";
import { ClientToServerEvents, ServerToClientEvents } from "@shared/socket";
import { useUserContext } from "../context/UserContext";
import { useRoomContext } from "../context/RoomContext";
import { useConfigurationContext } from "../context/ConfigurationContext";
import { useLogger } from "./useLogger";

export function useSocket() {
  const { url: backendUrl } = useConfigurationContext().backendUrl;
  const { user } = useUserContext();
  const { roomId } = useRoomContext();
  const socketNamespace = useNamespace();
  const logger = useLogger();

  const socket = useMemo(() => {
    logger.debug(`Established socket connection with: ${backendUrl}`);
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

  function emitJoinRoom() {
    socket.emit("joinRoom", { roomId, userId: user.id });
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
  };
}
