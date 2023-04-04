import { useEffect } from "react";
import { PeerConnection, usePeerConnections } from "./usePeerConnections";
import { ApplicationState, BaseAction, ErrorState, User } from "../types/commonTypes";
import { isModerator } from "../utils/participantsUtils";
import { PeerToPeerAction } from "../types/peerToPeerTypes";
import { useRoomContext } from "../context/RoomContext";
import { useUserContext } from "../context/UserContext";
import { useSocket } from "./useSocket";
import { useIsStateUpToDate } from "./useIsStateUpToDate";
import { findConnection, findUnconnectedUserIds } from "../utils/peerToPeerUtils";
import { usePeer } from "./usePeer";
import { isEmpty } from "lodash";

export interface UsePeerToPeerOptions<T, E extends BaseAction> {
  state: T;
  onDataReceived: (data: E | PeerToPeerAction<T>) => void;
  onUserDisconnected?: (userId: string) => void;
  onJoinSession?: (user: User) => void;
  onError: (error: ErrorState) => void;
  onRequestJoinRoom?: ({ userId, userName }: { userId: string; userName: string }) => void;
  onJoinRoomRejected?: (userId: string) => void;
}

export function usePeerToPeer<T extends ApplicationState, E extends BaseAction>({
  state,
  onDataReceived,
  onUserDisconnected,
  onJoinSession,
  onError,
  onRequestJoinRoom,
  onJoinRoomRejected,
}: UsePeerToPeerOptions<T, E>) {
  const { roomId } = useRoomContext();
  const { user } = useUserContext();
  const isStateUpToDate = useIsStateUpToDate();
  const {
    socket,
    emitAcceptJoinUser,
    emitRequestJoinRoom,
    emitRejectJoinUser,
    emitDataListenerEstablished,
    emitJoinRoom,
    emitCreateRoom,
  } = useSocket({ state });
  const peer = usePeer();
  const { addPeerConnection, removePeerConnection, readyPeerConnection, peerConnections } =
    usePeerConnections({
      onPeerConnectionReady: handlePeerConnectionReady,
    });

  function handlePeerConnectionReady(changes: PeerConnection[]) {
    if (!isModerator(user) || !isStateUpToDate.current) return;

    changes.forEach((connection) => {
      sendAction({ type: "INITIALIZE_STATE", payload: state }, connection.userId);
    });
  }

  function sendAction(event: E | PeerToPeerAction<T>, userId: string) {
    const connection = findConnection(peerConnections, userId);
    if (!connection) return;

    console.debug("Sending event", { event, userId });
    connection.send(event);
  }

  function broadcastAction(action: E | PeerToPeerAction<T>) {
    if (isEmpty(peerConnections)) return;

    console.debug("Broadcasting action", action);
    peerConnections.forEach((connection) => {
      connection.send(action);
    });
  }

  function disconnectUser(disconnectedUserId: string) {
    const closingConnection = findConnection(peerConnections, disconnectedUserId);
    onUserDisconnected?.(disconnectedUserId);
    if (!closingConnection) return;

    console.debug("Closing connection to", closingConnection.peer);
    closingConnection.close();
    removePeerConnection(closingConnection.peer);
  }

  function handleSocketUserConnected({
    connectedUserIds,
    connectedUserId,
  }: {
    connectedUserIds: string[];
    connectedUserId: string;
  }) {
    if (!peer) return;
    console.debug("New user connected", {
      connectedUserIds,
      connectedUserId,
      userId: user.id,
    });

    const unconnectedUserIds = findUnconnectedUserIds(connectedUserIds, user.id, peerConnections);
    if (unconnectedUserIds.length === 0) {
      console.debug("Connection to all users already established.");
      return;
    }

    const newConnections = unconnectedUserIds.map((id) => peer.connect(id, { reliable: true }));

    console.debug("Peer-Connections established with users:", unconnectedUserIds);
    addPeerConnection(newConnections);
  }

  function handleSocketDataListenerReady({
    receiverUserId,
    senderUserId,
  }: {
    receiverUserId: string;
    senderUserId: string;
  }) {
    if (!user.id || senderUserId !== user.id) return;
    readyPeerConnection(receiverUserId);
  }

  function handleOnData(data: E | PeerToPeerAction<T>) {
    console.debug("Received event", data);
    onDataReceived(data);

    if (data.type === "KICK") {
      socket.disconnect();
      onError({ type: "KICKED" });
    }

    if (!isStateUpToDate.current) {
      isStateUpToDate.current = true;
      onJoinSession?.(user);
    }
  }

  useEffect(() => {
    socket.on("requestedJoinRoom", ({ userId, userName }) => {
      onRequestJoinRoom?.({ userId, userName });
    });

    socket.on("acceptedJoinRequest", ({ userId }) => {
      if (userId === user.id) emitJoinRoom({ roomId, user });
    });

    socket.on("rejectedJoinRequest", ({ userId }) => {
      onJoinRoomRejected?.(userId);
    });

    socket.on("userConnected", ({ connectedUserIds, connectedUserId }) => {
      handleSocketUserConnected({ connectedUserIds, connectedUserId });
    });

    socket.on("dataListenerReady", ({ receiverUserId, senderUserId }) => {
      handleSocketDataListenerReady({ receiverUserId, senderUserId });
    });

    socket.on("userDisconnected", ({ disconnectedUserId }) => {
      disconnectUser(disconnectedUserId);
    });

    return () => {
      socket.off("userConnected");
      socket.off("dataListenerReady");
      socket.off("userDisconnected");
      socket.off("requestedJoinRoom");
      socket.off("rejectedJoinRequest");
      socket.off("acceptedJoinRequest");
    };
  });

  useEffect(() => {
    peer?.on("connection", (incomingConnection) => {
      incomingConnection.on("open", () => {
        incomingConnection.on("data", (data) => {
          handleOnData(data as E);
        });
        emitDataListenerEstablished(incomingConnection.peer);
      });

      incomingConnection.on("close", () => {
        disconnectUser(incomingConnection.peer);
      });
    });

    peer?.on("error", (error) => {
      console.debug("Peer Connection Error: ", error);
    });

    return () => {
      peer?.off("connection");
      peer?.off("error");
    };
  });

  useEffect(() => {
    if (!user.id || !roomId || !user.name) return;

    if (socket.disconnected) {
      onError({ type: "DISCONNECTED" });
      return;
    }
    if (isModerator(user)) {
      emitCreateRoom();
    } else {
      emitRequestJoinRoom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id, roomId, user.name]);

  return {
    broadcastAction,
    sendAction,
    rejectJoinUser: emitRejectJoinUser,
    acceptJoinUser: emitAcceptJoinUser,
  };
}
