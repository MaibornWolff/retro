import { useEffect, useRef, useState } from "react";
import { DataConnection } from "peerjs";
import { difference } from "lodash";

export interface PeerConnection {
  userId: string;
  isReady: boolean;
}

export function usePeerConnections({
  onPeerConnectionReady,
}: {
  onPeerConnectionReady: (changes: PeerConnection[]) => void;
}) {
  const previousPeerConnectionsRef = useRef<PeerConnection[]>([]);
  const [peerConnections, setPeerConnections] = useState<PeerConnection[]>([]);

  const peerConnectionsRef = useRef<DataConnection[]>([]);

  useEffect(() => {
    const isReadyChanges = difference(peerConnections, previousPeerConnectionsRef.current).filter(
      (connection) => connection.isReady
    );
    onPeerConnectionReady(isReadyChanges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peerConnections]);

  const addPeerConnection = (newConnections: DataConnection[]) => {
    peerConnectionsRef.current = [...peerConnectionsRef.current, ...newConnections];

    const newUserIds = newConnections.map((connection) => {
      return { userId: connection.peer, isReady: false };
    });
    setPeerConnections((oldState) => {
      previousPeerConnectionsRef.current = [...oldState];

      return [...oldState, ...newUserIds];
    });
  };

  const removePeerConnection = (userId: string) => {
    peerConnectionsRef.current = peerConnectionsRef.current.filter(
      (connection) => userId !== connection.peer
    );

    setPeerConnections((oldState) => {
      previousPeerConnectionsRef.current = [...oldState];

      const remainingPeerConnections = oldState.filter(
        (connection) => connection.userId !== userId
      );
      return [...remainingPeerConnections];
    });
  };

  const readyPeerConnection = (userId: string) => {
    setPeerConnections((oldState) => {
      previousPeerConnectionsRef.current = [...oldState];

      return oldState.map((connection) => {
        if (connection.userId === userId) {
          return { ...connection, isReady: true };
        }
        return connection;
      });
    });
  };

  return {
    addPeerConnection,
    removePeerConnection,
    readyPeerConnection,
    peerConnections: peerConnectionsRef.current,
  };
}
