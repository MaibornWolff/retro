export interface ServerToClientEvents {
  requestedJoinRoom: ({ userId, userName }: { userId: string; userName: string }) => void;
  acceptedJoinRequest: ({ userId }: { userId: string }) => void;
  rejectedJoinRequest: ({ userId }: { userId: string }) => void;
  userConnected: ({
    connectedUserIds,
    connectedUserId,
  }: {
    connectedUserIds: string[];
    connectedUserId: string;
  }) => void;
  userDisconnected: ({ disconnectedUserId }: { disconnectedUserId: string }) => void;
  dataListenerReady: ({
    receiverUserId,
    senderUserId,
  }: {
    receiverUserId: string;
    senderUserId: string;
  }) => void;
}

export interface ClientToServerEvents {
  requestJoinRoom: ({
    roomId,
    userId,
    userName,
  }: {
    roomId: string;
    userId: string;
    userName: string;
  }) => void;
  joinRoom: ({ roomId, userId }: { roomId: string; userId: string }) => void;
  acceptJoinRequest: ({ roomId, userId }: { roomId: string; userId: string }) => void;
  rejectJoinRequest: ({ roomId, userId }: { roomId: string; userId: string }) => void;
  dataListenerEstablished: ({
    roomId,
    receiverUserId,
    senderUserId,
  }: {
    roomId: string;
    receiverUserId: string;
    senderUserId: string;
  }) => void;
}
