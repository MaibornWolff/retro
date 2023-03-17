export interface SocketConnection {
  roomId?: string;
  waitingRoomId: string;
  userId: string;
}

export class ConnectionStore {
  constructor() {
    this.connectionBySocketId = new Map();
  }

  private readonly connectionBySocketId: Map<string, SocketConnection>;

  getConnection(socketId: string) {
    return this.connectionBySocketId.get(socketId);
  }

  getConnections(socketIds: string[]): string[] {
    if (socketIds.length === 0) return [];

    const userIds: string[] = [];
    socketIds.forEach((socketId) => {
      const connection = this.connectionBySocketId.get(socketId);
      if (connection) userIds.push(connection.userId);
    });
    return userIds;
  }

  addConnection(socketId: string, socketConnection: SocketConnection) {
    this.connectionBySocketId.set(socketId, socketConnection);
  }

  removeConnection(socketId: string) {
    this.connectionBySocketId.delete(socketId);
  }

  get() {
    return {
      connectionBySocketId: this.connectionBySocketId,
    };
  }
}
