import { DataConnection } from "peerjs";

export function findUnconnectedUserIds(
  connectedUserIds: string[],
  myUserId: string,
  peerConnections: DataConnection[],
) {
  return connectedUserIds.filter(
    (connectedUserId) =>
      connectedUserId !== myUserId && !isConnected(peerConnections, connectedUserId),
  );
}

function isConnected(peerConnections: DataConnection[], connectedUserId: string) {
  return peerConnections.some((connection) => connection.peer === connectedUserId);
}

export function findConnection(peerConnections: DataConnection[], userId: string) {
  return peerConnections.find((connection) => userId === connection.peer);
}
