import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors, { CorsOptions } from "cors";

import { ClientToServerEvents, ServerToClientEvents } from "@shared/socket";
import { ConnectionStore } from "./store/ConnectionStore";
import { logger } from "@shared/logger";
import { configuration } from "@shared/configuration";

export function setupServer() {
  const app = express();
  const server = http.createServer(app);

  const connectionStore = new ConnectionStore();

  const corsOptions: CorsOptions = {
    origin: configuration.corsOrigins,
  };

  const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
    cors: corsOptions,
    allowEIO3: true,
  });

  app.use(cors(corsOptions));

  app.get("/:namespace/rooms/:roomId", (req, res) => {
    const { roomId, namespace } = req.params;
    const roomExists = io.of(`/${namespace}`).adapter.rooms.has(roomId);
    roomExists ? res.status(200) : res.status(404);
    return res.send();
  });

  const namespaces = ["/retro", "/poker"];

  namespaces.forEach((namespace) => {
    const ioNamespace = io.of(namespace);
    ioNamespace.on("connection", (socket: Socket) => {
      socket.on("requestJoinRoom", async ({ roomId, userId, userName }) => {
        const waitingRoomId = getWaitingRoomId(roomId);
        await socket.join(waitingRoomId);
        connectionStore.addConnection(socket.id, { userId, waitingRoomId });
        logger.debug("requestJoinRoom", { waitingRoomId, userId, userName });
        socket.to(waitingRoomId).emit("requestedJoinRoom", { userId, userName });
      });

      socket.on("acceptJoinRequest", ({ roomId, userId }) => {
        const waitingRoomId = getWaitingRoomId(roomId);
        logger.debug("acceptJoinRequest", { waitingRoomId, userId });
        ioNamespace.to(waitingRoomId).emit("acceptedJoinRequest", { userId });
      });

      socket.on("joinRoom", async ({ roomId, userId }) => {
        await socket.join(roomId);
        const waitingRoomId = getWaitingRoomId(roomId);
        await socket.join(waitingRoomId);

        const socketIdsInRoom = Array.from(ioNamespace.adapter.rooms.get(roomId) ?? []);
        connectionStore.addConnection(socket.id, { userId, waitingRoomId, roomId });
        const connectedUserIds = connectionStore.getConnections(socketIdsInRoom);
        logger.debug("Joining room", {
          userId,
          roomId,
          connectionStoreState: connectionStore.get(),
        });
        ioNamespace.to(roomId).emit("userConnected", {
          connectedUserIds,
          connectedUserId: userId,
        });
      });

      socket.on("rejectJoinRequest", async ({ roomId, userId }) => {
        const waitingRoomId = getWaitingRoomId(roomId);
        logger.debug("rejectJoinRequest", { waitingRoomId, userId });
        ioNamespace.to(waitingRoomId).emit("rejectedJoinRequest", {
          userId,
        });
      });

      socket.on("dataListenerEstablished", ({ roomId, receiverUserId, senderUserId }) => {
        logger.debug("dataListenerEstablished", { receiverUserId, senderUserId });
        socket.to(roomId).emit("dataListenerReady", { receiverUserId, senderUserId });
      });

      socket.on("disconnect", (reason) => {
        const connection = connectionStore.getConnection(socket.id);
        if (!connection) return;

        const { userId, waitingRoomId, roomId } = connection;
        connectionStore.removeConnection(socket.id);
        logger.debug("User disconnected.", {
          reason,
          userId,
          roomId,
          connectionStoreState: connectionStore.get(),
        });
        if (roomId) socket.to(roomId).emit("userDisconnected", { disconnectedUserId: userId });
        socket.to(waitingRoomId).emit("userDisconnected", { disconnectedUserId: userId });
      });
    });
  });

  return server;
}

function getWaitingRoomId(roomId: string) {
  return `${roomId}_waitingRoom`;
}
